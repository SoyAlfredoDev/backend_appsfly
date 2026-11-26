import { generalPrisma as general } from "../../dbGeneral.js";

import {
    addDaysToDateParts,
    formatExpiryDateSpanish,
    getChileDateParts,
    getDayKey,
    wasContactedInChileMonth,
} from "./adminEmailCampaignChileDate.js";

import {
    canDeliverCampaignEmail,
    listCampaignSuppressions,
    listNewsletterConsent,
    newsletterUnsubscribeUrl,
    normalizeMarketingEmail,
} from "./campaignNewsletterConsent.js";
import {
    SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_5D,
    SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_TODAY,
} from "./adminEmailCampaignConstants.js";
import { getFrontendBaseUrl } from "../../emails/shared/layout.js";



function isSubscriptionActive(sub) {

    if (!sub || !["ACTIVE", "CANCELLED"].includes(sub.subscriptionStatus)) {

        return false;

    }

    const end = new Date(sub.subscriptionEndDate);

    return !Number.isNaN(end.getTime()) && end > new Date();

}



function pickCurrentActiveSubscription(subscriptions) {

    const active = (subscriptions ?? []).filter(isSubscriptionActive);

    if (!active.length) return null;

    return active.sort(

        (a, b) => new Date(b.subscriptionEndDate) - new Date(a.subscriptionEndDate),

    )[0];

}



function buildAdminRecipient(user, business, extra = {}) {

    if (!user?.userEmail?.trim()) return null;

    return {

        userId: user.userId,

        businessId: business.businessId,

        email: user.userEmail.trim().toLowerCase(),

        firstName: user.userFirstName?.trim() || "Administrador",

        lastName: user.userLastName?.trim() || "",

        businessName: business.businessName,

        emailConfirmed: Boolean(user.userConfirmEmail),

        ...extra,

    };

}



/**

 * Negocios sin plan operativo vigente → admins que ven pantalla suspendida.

 * Incluye: nunca suscrito + suscripción vencida.

 */

async function resolveBusinessAdminRecipients(segment) {

    const businesses = await general.business.findMany({

        include: {

            subscriptions: {

                select: {

                    subscriptionStatus: true,

                    subscriptionEndDate: true,

                },

            },

            UserBusiness: {

                where: { userBusinessRole: "ADMIN" },

                include: {

                    User: {

                        select: {

                            userId: true,

                            userFirstName: true,

                            userLastName: true,

                            userEmail: true,

                            userConfirmEmail: true,

                        },

                    },

                },

            },

        },

    });



    const recipients = [];



    for (const business of businesses) {

        const hasActivePlan = (business.subscriptions ?? []).some(isSubscriptionActive);

        if (segment === "active" ? !hasActivePlan : hasActivePlan) continue;
        if (segment === "expired" && !(business.subscriptions ?? []).some(
            (sub) => sub.subscriptionStatus === "EXPIRED" || new Date(sub.subscriptionEndDate) <= new Date(),
        )) continue;



        for (const membership of business.UserBusiness ?? []) {

            const recipient = buildAdminRecipient(membership.User, business);

            if (recipient) recipients.push(recipient);

        }

    }



    return recipients;

}



/**

 * Admins de negocios con plan activo que vence en N días (calendario Chile).

 * @param {{ daysBeforeExpiry: number }} options — 5 = cinco días antes; 0 = hoy

 */

export async function resolvePlanExpiringBusinessAdminRecipients({ daysBeforeExpiry = 0 } = {}) {

    const todayParts = getChileDateParts();

    const targetParts = addDaysToDateParts(todayParts, daysBeforeExpiry);

    const targetKey = [
        targetParts.year,
        String(targetParts.month).padStart(2, "0"),
        String(targetParts.day).padStart(2, "0"),
    ].join("-");



    const businesses = await general.business.findMany({

        include: {

            subscriptions: {

                select: {

                    subscriptionStatus: true,

                    subscriptionEndDate: true,

                    plan: {

                        select: {

                            planName: true,

                        },

                    },

                },

            },

            UserBusiness: {

                where: { userBusinessRole: "ADMIN" },

                include: {

                    User: {

                        select: {

                            userId: true,

                            userFirstName: true,

                            userLastName: true,

                            userEmail: true,

                            userConfirmEmail: true,

                        },

                    },

                },

            },

        },

    });



    const recipients = [];



    for (const business of businesses) {

        const subscription = pickCurrentActiveSubscription(business.subscriptions);

        if (!subscription) continue;



        const endKey = getDayKey(new Date(subscription.subscriptionEndDate));

        if (endKey !== targetKey) continue;



        const planName = subscription.plan?.planName?.trim() || "Plan AppsFly";

        const expiryDateFormatted = formatExpiryDateSpanish(subscription.subscriptionEndDate);



        for (const membership of business.UserBusiness ?? []) {

            const recipient = buildAdminRecipient(membership.User, business, {

                planName,

                subscriptionEndDate: subscription.subscriptionEndDate,

                daysUntilExpiry: daysBeforeExpiry,

                expiryDateFormatted,

            });

            if (recipient) recipients.push(recipient);

        }

    }



    return recipients;

}



export async function resolveSuspendedBusinessAdminRecipients() {
    return resolveBusinessAdminRecipients("suspended");
}

export async function countSuspendedBusinessAdminRecipients() {

    const list = await resolveAudienceRecipients("SUSPENDED_BUSINESS_ADMINS");

    const uniqueEmails = new Set(list.map((r) => r.email));

    return {

        estimatedRecipients: list.length,

        uniqueEmails: uniqueEmails.size,

        businesses: new Set(list.map((r) => r.businessId)).size,

    };

}



export async function countPlanExpiringBusinessAdminRecipients(daysBeforeExpiry, options = {}) {
    const audienceType = daysBeforeExpiry === 0
        ? SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_TODAY.audienceType
        : SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_5D.audienceType;
    const list = await resolveAudienceRecipients(audienceType, null, options);

    const uniqueEmails = new Set(list.map((r) => r.email));

    return {

        estimatedRecipients: list.length,

        uniqueEmails: uniqueEmails.size,

        businesses: new Set(list.map((r) => r.businessId)).size,

        daysBeforeExpiry,

    };

}



/**
 * Cola justa: nunca contactados primero (FIFO por createdAt), luego más antiguo lastOutreachAt.
 */
function sortProspectOutreachQueue(prospects) {
    return [...prospects].sort((a, b) => {
        const aContacted = Boolean(a.lastOutreachAt);
        const bContacted = Boolean(b.lastOutreachAt);
        if (!aContacted && bContacted) return -1;
        if (aContacted && !bContacted) return 1;
        if (!aContacted && !bContacted) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return new Date(a.lastOutreachAt).getTime() - new Date(b.lastOutreachAt).getTime();
    });
}

/**
 * Prospectos activos que NO son usuarios registrados en AppsFly.
 * Excluye quienes ya recibieron outreach este mes (calendario Chile).
 */
async function findOptedInProspects(consent) {
    const prospects = await general.platformEmailProspect.findMany({
        where: { status: "ACTIVE", email: { in: [...consent.keys()], mode: "insensitive" } },
    });
    if (!prospects.length) return [];

    const users = await general.user.findMany({
        select: { userEmail: true },
    });
    const registeredEmails = new Set(users.map((user) => normalizeMarketingEmail(user.userEmail)));
    const eligibleProspects = sortProspectOutreachQueue(
        prospects.filter((prospect) => !wasContactedInChileMonth(prospect.lastOutreachAt)),
    );
    const registerUrl = `${getFrontendBaseUrl()}/register?from=prospect-email`;

    return eligibleProspects
        .filter((prospect) => !registeredEmails.has(normalizeMarketingEmail(prospect.email)))
        .map((prospect) => ({
            userId: prospect.prospectId,
            businessId: null,
            email: prospect.email,
            firstName: prospect.firstName?.trim() || "Estimado",
            lastName: prospect.lastName?.trim() || "",
            businessName: prospect.companyName?.trim() || "Tu negocio",
            emailConfirmed: false,
            outreachEmailsSent: prospect.outreachEmailsSent ?? 0,
            lastOutreachVariantId: prospect.lastOutreachVariantId ?? null,
            registerUrl,
        }));
}

export async function resolvePlatformProspectRecipients() {
    return resolveAudienceRecipients("PLATFORM_PROSPECTS");
}

export async function countPlatformProspectRecipients() {
    const list = await resolvePlatformProspectRecipients();
    const totalActive = await general.platformEmailProspect.count({ where: { status: "ACTIVE" } });
    return {
        estimatedRecipients: list.length,
        uniqueEmails: list.length,
        activeInList: totalActive,
        excludedFromAudience: Math.max(0, totalActive - list.length),
        maxOnePerMonth: true,
        note: "Solo prospectos suscritos a las novedades, con un envío máximo al mes.",
    };
}

function isSystemServiceNotice(audienceType, campaignKey) {
    return [SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_5D, SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_TODAY].some(
        (campaign) => campaign.audienceType === audienceType && campaign.campaignKey === campaignKey,
    );
}

export async function isCampaignRecipientEligible(campaign, recipient) {
    const email = normalizeMarketingEmail(recipient.email ?? recipient.recipientEmail);
    if (!email) return false;
    return canDeliverCampaignEmail(email, !isSystemServiceNotice(campaign.audienceType, campaign.campaignKey));
}

async function findNewsletterUsers(audienceType, consent) {
    const where = { userEmail: { in: [...consent.keys()], mode: "insensitive" } };
    if (audienceType === "CONFIRMED_EMAIL") where.userConfirmEmail = true;
    if (audienceType === "PENDING_EMAIL") where.userConfirmEmail = false;
    const users = await general.user.findMany({
        where,
        select: {
            userId: true,
            userEmail: true,
            userFirstName: true,
            userLastName: true,
            userConfirmEmail: true,
        },
    });
    return users.map((user) => ({
        userId: user.userId,
        businessId: null,
        email: user.userEmail,
        firstName: user.userFirstName,
        lastName: user.userLastName,
        businessName: "Tu negocio",
        emailConfirmed: user.userConfirmEmail,
    }));
}

/**
 * @param {string} audienceType
 * @param {unknown} [_audienceParams]
 * @param {{campaignKey?: string | null}} [options]
 */
export async function resolveAudienceRecipients(
    audienceType,
    _audienceParams = null,
    { campaignKey = null } = {},
) {
    if (audienceType === "CUSTOM_SEGMENT") return [];
    const serviceNotice = isSystemServiceNotice(audienceType, campaignKey);
    const [consent, suppressed] = await Promise.all([
        serviceNotice ? new Map() : listNewsletterConsent(),
        listCampaignSuppressions({ includesProspectOptOuts: !serviceNotice }),
    ]);
    if (!serviceNotice && consent.size === 0) return [];

    let candidates;
    switch (audienceType) {
        case "SUSPENDED_BUSINESS_ADMINS":
            candidates = await resolveSuspendedBusinessAdminRecipients();
            break;
        case "BUSINESS_ADMINS_PLAN_EXPIRING_5D":
            candidates = await resolvePlanExpiringBusinessAdminRecipients({ daysBeforeExpiry: 5 });
            break;
        case "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY":
            candidates = await resolvePlanExpiringBusinessAdminRecipients({ daysBeforeExpiry: 0 });
            break;
        case "ACTIVE_SUBSCRIPTION":
            candidates = await resolveBusinessAdminRecipients("active");
            break;
        case "EXPIRED_SUBSCRIPTION":
            candidates = await resolveBusinessAdminRecipients("expired");
            break;
        case "ALL_USERS":
        case "CONFIRMED_EMAIL":
        case "PENDING_EMAIL":
            candidates = await findNewsletterUsers(audienceType, consent);
            break;
        case "PLATFORM_PROSPECTS":
            candidates = await findOptedInProspects(consent);
            break;
        case "NEWSLETTER_SUBSCRIBERS":
            candidates = [...consent].map(([email, userId]) => ({
                userId,
                businessId: null,
                email,
                firstName: "",
                lastName: "",
                businessName: "Tu negocio",
                emailConfirmed: false,
            }));
            break;
        default:
            return [];
    }

    const seen = new Set();
    const recipients = [];
    for (const candidate of candidates) {
        const email = normalizeMarketingEmail(candidate.email);
        if (!email || suppressed.has(email) || (!serviceNotice && !consent.has(email))) continue;
        const key = serviceNotice ? `${candidate.businessId}:${email}` : email;
        if (seen.has(key)) continue;
        seen.add(key);
        recipients.push({
            ...candidate,
            email,
            ...(!serviceNotice && {
                newsletterSubscriberId: consent.get(email),
                unsubscribeUrl: newsletterUnsubscribeUrl(consent.get(email)),
            }),
        });
    }
    return recipients;
}

export async function countAudienceByType(audienceType, options = {}) {
    const recipients = await resolveAudienceRecipients(audienceType, null, options);
    return recipients.length;
}
