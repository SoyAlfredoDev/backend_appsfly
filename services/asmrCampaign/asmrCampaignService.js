import {
    segmentOneYearNoPurchase,
    simulateCampaignSend,
    createCampaignRecordPayload,
    ASMR_CAMPAIGN_TYPES,
} from "./asmrSegmentationService.js";

const campaignInclude = {
    user: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
};

export const segmentAsmrCampaign = async (prisma, body) => {
    const { auditMonth, auditYear, campaignType } = body;

    if (campaignType && campaignType !== ASMR_CAMPAIGN_TYPES.ONE_YEAR_NO_PURCHASE) {
        const error = new Error("Tipo de campaña no habilitado.");
        error.statusCode = 400;
        throw error;
    }

    return segmentOneYearNoPurchase(prisma, { auditMonth, auditYear });
};

export const executeAsmrCampaign = async (prisma, body, userId) => {
    const {
        auditMonth,
        auditYear,
        campaignName = "Clientes 1 año sin comprar",
        campaignType = ASMR_CAMPAIGN_TYPES.ONE_YEAR_NO_PURCHASE,
        discountPercent = 20,
    } = body;

    const segmentation = await segmentOneYearNoPurchase(prisma, {
        auditMonth,
        auditYear,
    });

    if (segmentation.breakdown.eligibleFinal === 0) {
        const error = new Error(
            "No hay contactos aptos para enviar la campaña con los filtros seleccionados.",
        );
        error.statusCode = 400;
        throw error;
    }

    await simulateCampaignSend();

    const data = createCampaignRecordPayload({
        segmentation,
        campaignName: campaignName.trim(),
        campaignType,
        discountPercent: Number(discountPercent),
        userId,
    });

    const campaign = await prisma.asmrCampaign.create({
        data,
        include: campaignInclude,
    });

    return {
        campaign,
        segmentation,
    };
};

export const listAsmrCampaigns = async (prisma) => {
    return prisma.asmrCampaign.findMany({
        orderBy: { executedAt: "desc" },
        include: campaignInclude,
    });
};

export const getAsmrCampaignSummary = async (prisma) => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [campaigns, sentThisMonth] = await Promise.all([
        prisma.asmrCampaign.findMany({
            select: {
                campaignStatus: true,
                contactsSuccess: true,
                executedAt: true,
            },
        }),
        prisma.asmrCampaign.aggregate({
            _sum: { contactsSuccess: true },
            _count: { campaignId: true },
            where: {
                executedAt: {
                    gte: monthStart,
                    lte: monthEnd,
                },
                campaignStatus: "SENT",
            },
        }),
    ]);

    const activeCampaigns = campaigns.filter((c) => c.campaignStatus === "SENT").length;
    const messagesThisMonth = sentThisMonth._sum.contactsSuccess ?? 0;
    const lastCampaign = await prisma.asmrCampaign.findFirst({
        orderBy: { executedAt: "desc" },
        select: { eligibleFinal: true },
    });

    return {
        activeCampaigns,
        messagesThisMonth,
        clientsToContact: lastCampaign?.eligibleFinal ?? 0,
        campaignsExecuted: campaigns.length,
    };
};
