import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";

import {
    addDaysToDateParts,
    formatExpiryDateSpanish,
    getChileDateParts,
    getDayKey,
    wasContactedInChileMonth,
} from "./adminEmailCampaignChileDate.js";

import { buildProspectUnsubscribeUrl } from "../emailProspect/emailProspectService.js";
import { getFrontendBaseUrl } from "../../emails/shared/layout.js";

const general = new PrismaGeneral();

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

export async function resolveSuspendedBusinessAdminRecipients() {

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

        if (hasActivePlan) continue;



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

    const targetKey = getDayKey(

        new Date(Date.UTC(targetParts.year, targetParts.month - 1, targetParts.day)),

    );



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



export async function countSuspendedBusinessAdminRecipients() {

    const list = await resolveSuspendedBusinessAdminRecipients();

    const uniqueEmails = new Set(list.map((r) => r.email));

    return {

        estimatedRecipients: list.length,

        uniqueEmails: uniqueEmails.size,

        businesses: new Set(list.map((r) => r.businessId)).size,

    };

}



export async function countPlanExpiringBusinessAdminRecipients(daysBeforeExpiry) {

    const list = await resolvePlanExpiringBusinessAdminRecipients({ daysBeforeExpiry });

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
export async function resolvePlatformProspectRecipients() {
    const prospects = await general.platformEmailProspect.findMany({
        where: { status: "ACTIVE" },
    });

    if (!prospects.length) return [];

    const users = await general.user.findMany({
        select: { userEmail: true },
    });
    const registeredEmails = new Set(
        users.map((u) => u.userEmail?.trim().toLowerCase()).filter(Boolean),
    );

    const suspendedAdmins = await resolveSuspendedBusinessAdminRecipients();
    const suspendedEmails = new Set(suspendedAdmins.map((r) => r.email));

    const eligibleProspects = sortProspectOutreachQueue(
        prospects.filter(
            (prospect) => !wasContactedInChileMonth(prospect.lastOutreachAt),
        ),
    );

    const registerUrl = `${getFrontendBaseUrl()}/register?from=prospect-email`;
    const recipients = [];

    for (const prospect of eligibleProspects) {
        const email = prospect.email.trim().toLowerCase();
        if (registeredEmails.has(email) || suspendedEmails.has(email)) continue;

        recipients.push({
            userId: prospect.prospectId,
            businessId: null,
            email,
            firstName: prospect.firstName?.trim() || "Estimado",
            lastName: prospect.lastName?.trim() || "",
            businessName: prospect.companyName?.trim() || "Tu negocio",
            emailConfirmed: false,
            outreachEmailsSent: prospect.outreachEmailsSent ?? 0,
            lastOutreachVariantId: prospect.lastOutreachVariantId ?? null,
            registerUrl,
            unsubscribeUrl: buildProspectUnsubscribeUrl(prospect.unsubscribeToken),
        });
    }

    return recipients;
}

export async function countPlatformProspectRecipients() {
    const list = await resolvePlatformProspectRecipients();
    const uniqueEmails = new Set(list.map((r) => r.email));
    const totalActive = await general.platformEmailProspect.count({
        where: { status: "ACTIVE" },
    });
    return {
        estimatedRecipients: list.length,
        uniqueEmails: uniqueEmails.size,
        activeInList: totalActive,
        excludedAsUsers: Math.max(0, totalActive - list.length),
        maxOnePerMonth: true,
        note: "Máximo 1 correo por prospecto al mes (calendario Chile). Cola: nunca contactados primero.",
    };
}



export async function resolveAudienceRecipients(audienceType, audienceParams = null) {

    switch (audienceType) {

        case "SUSPENDED_BUSINESS_ADMINS":

            return resolveSuspendedBusinessAdminRecipients();

        case "BUSINESS_ADMINS_PLAN_EXPIRING_5D":

            return resolvePlanExpiringBusinessAdminRecipients({ daysBeforeExpiry: 5 });

        case "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY":

            return resolvePlanExpiringBusinessAdminRecipients({ daysBeforeExpiry: 0 });

        case "PLATFORM_PROSPECTS":

            return resolvePlatformProspectRecipients();

        default:

            return [];

    }

}



export async function countAudienceByType(audienceType) {

    switch (audienceType) {

        case "SUSPENDED_BUSINESS_ADMINS": {

            const stats = await countSuspendedBusinessAdminRecipients();

            return stats.estimatedRecipients;

        }

        case "BUSINESS_ADMINS_PLAN_EXPIRING_5D": {

            const stats = await countPlanExpiringBusinessAdminRecipients(5);

            return stats.estimatedRecipients;

        }

        case "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY": {

            const stats = await countPlanExpiringBusinessAdminRecipients(0);

            return stats.estimatedRecipients;

        }

        case "PLATFORM_PROSPECTS": {

            const stats = await countPlatformProspectRecipients();

            return stats.estimatedRecipients;

        }

        case "ALL_USERS":

            return general.user.count();

        case "CONFIRMED_EMAIL":

            return general.user.count({ where: { userConfirmEmail: true } });

        case "PENDING_EMAIL":

            return general.user.count({ where: { userConfirmEmail: false } });

        case "ACTIVE_SUBSCRIPTION":

            return general.subscription.count({

                where: { subscriptionStatus: "ACTIVE" },

            });

        case "EXPIRED_SUBSCRIPTION":

            return general.subscription.count({

                where: { subscriptionStatus: "EXPIRED" },

            });

        case "NEWSLETTER_SUBSCRIBERS":

            return general.newsletterSubscriber.count();

        case "CUSTOM_SEGMENT":

            return 0;

        default:

            return 0;

    }

}

