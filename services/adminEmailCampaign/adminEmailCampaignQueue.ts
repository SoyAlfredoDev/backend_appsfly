export type CampaignQueuePause = { code: string; resumeAt: string };

type PausedRun = { runStatus: string; errorLog: unknown };

export function campaignQueuePause(run?: PausedRun | null): CampaignQueuePause | null {
  if (run?.runStatus !== "PENDING" || !run.errorLog || typeof run.errorLog !== "object") {
    return null;
  }
  const queue = "deliveryQueue" in run.errorLog ? run.errorLog.deliveryQueue : null;
  if (!queue || typeof queue !== "object" || !("code" in queue) || !("resumeAt" in queue)) {
    return null;
  }
  if (
    typeof queue.code !== "string" ||
    typeof queue.resumeAt !== "string" ||
    !Number.isFinite(Date.parse(queue.resumeAt))
  ) {
    return null;
  }
  return { code: queue.code, resumeAt: queue.resumeAt };
}

export function campaignQueueMessage(code: string): string {
  switch (code) {
    case "CAMPAIGN_MONTHLY_QUOTA":
      return "Se agotó la cuota mensual gratuita. La campaña se reanudará cuando Resend renueve el cupo.";
    case "CAMPAIGN_DAILY_QUOTA":
      return "Se agotó la cuota diaria gratuita. La campaña se reanudará cuando Resend renueve el cupo.";
    case "CAMPAIGN_QUOTA_UNAVAILABLE":
      return "El envío quedó en pausa porque no se pudo comprobar la cuota gratuita.";
    default:
      return "Los correos pendientes quedaron en cola para el siguiente ciclo.";
  }
}
