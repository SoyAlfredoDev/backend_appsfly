import app from "./app.js";
import { startEmailCampaignScheduler } from "./services/adminEmailCampaign/adminEmailCampaignScheduler.js";

const PORT = 3000;
// Servidor listening on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    startEmailCampaignScheduler();
});
