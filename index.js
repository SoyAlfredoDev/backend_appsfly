import app from "./app.js";
import { startEmailCampaignScheduler } from "./services/adminEmailCampaign/adminEmailCampaignScheduler.js";

const PORT = Number(process.env.PORT) || 3000;

/** En Vercel el entrypoint es api/index.js (serverless); no abrir puerto aquí. */
if (process.env.VERCEL !== "1") {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
        startEmailCampaignScheduler();
    });
}

export default app;
