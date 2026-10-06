/**
 * One-off cleanup for test users and businesses in generalDB + sharedDB.
 * Usage: node scripts/cleanupTestTenants.mjs [--dry-run]
 */
import dotenv from "dotenv";
import { PrismaClient as GeneralPrisma } from "../src/generated/general/index.js";
import { PrismaClient as SharedPrisma } from "../src/generated/shared/index.js";

dotenv.config({ path: process.env.ENV_FILE ?? ".env.production" });

const dryRun = process.argv.includes("--dry-run");

const BUSINESS_IDS = [
  "932837e4-0b1a-4a55-bb3b-0653ffd3853f",
  "c3eec4f8-78b5-4bbb-a95a-b3707f346e4d",
];

const USER_IDS = [
  "386d4143-aa2a-4273-b88b-975852451bf5",
  "477e632d-ebc6-464b-a5b4-498fd659c0f2",
  "80fd5f1f-f8f4-4adc-af99-2f4c4c9af809",
  "955b4449-57ca-4aab-9d5d-17a5d1f8c663",
  "9d23ac26-7959-4a44-b18b-be687907d161",
  "bb1d0c14-9981-47d6-a1ff-d87885f53dd3",
  "fb23ac81-a830-46c9-9d6f-eccc9579d400",
];

const general = new GeneralPrisma();
const shared = new SharedPrisma();

async function deleteSharedTenantData(businessId) {
  const where = { businessId };
  const steps = [
    () => shared.appointment.deleteMany({ where }),
    () => shared.appointmentWeeklyAvailability.deleteMany({ where }),
    () => shared.appointmentSettings.deleteMany({ where }),
    () => shared.purchaseCertificateDetail.deleteMany({ where }),
    () => shared.purchaseCertificate.deleteMany({ where }),
    () => shared.labDispatch.deleteMany({ where }),
    () => shared.workOrder.deleteMany({ where }),
    () => shared.prescription.deleteMany({ where }),
    () => shared.quotationDetail.deleteMany({ where }),
    () => shared.quotation.deleteMany({ where }),
    () => shared.taxDocumentAuditLog.deleteMany({ where }),
    () => shared.taxDocument.deleteMany({ where }),
    () => shared.purchaseDetail.deleteMany({ where }),
    () => shared.purchase.deleteMany({ where }),
    () => shared.payment.deleteMany({ where }),
    () => shared.saleDetail.deleteMany({ where }),
    () => shared.sale.deleteMany({ where }),
    () => shared.cashExpense.deleteMany({ where }),
    () => shared.dailySales.deleteMany({ where }),
    () => shared.transactions.deleteMany({ where }),
    () => shared.expense.deleteMany({ where }),
    () => shared.expenseCategory.deleteMany({ where }),
    () => shared.asmrCampaign.deleteMany({ where }),
    () => shared.inventoryMovement.deleteMany({ where }),
    () => shared.productAttributeValue.deleteMany({ where }),
    () => shared.productStock.deleteMany({ where }),
    () => shared.scanCode.deleteMany({ where }),
    () => shared.product.deleteMany({ where }),
    () => shared.categoryAttribute.deleteMany({ where }),
    () => shared.category.deleteMany({ where }),
    () => shared.service.deleteMany({ where }),
    () => shared.laboratory.deleteMany({ where }),
    () => shared.provider.deleteMany({ where }),
    () => shared.customer.deleteMany({ where }),
    () => shared.user.deleteMany({ where }),
  ];

  for (const step of steps) {
    const result = await step();
    if (result.count > 0) {
      console.log(`  shared ${businessId}: deleted ${result.count} rows`);
    }
  }
}

async function deleteBusinessFromGeneral(businessId) {
  const cancellations = await general.subscriptionCancellation.deleteMany({
    where: { subscriptionBusinessId: businessId },
  });
  const payments = await general.subscriptionPayment.deleteMany({
    where: { subscriptionBusinessId: businessId },
  });
  const subscriptions = await general.subscription.deleteMany({
    where: { subscriptionBusinessId: businessId },
  });
  const guests = await general.userGuest.deleteMany({
    where: { userGuestBusinessId: businessId },
  });
  const memberships = await general.userBusiness.deleteMany({
    where: { userBusinessBusinessId: businessId },
  });
  const quotationIndex = await general.quotationEmailDispatchIndex.deleteMany({
    where: { businessId },
  });
  const saleShares = await general.salePublicShareIndex.deleteMany({
    where: { businessId },
  });
  const business = await general.business.delete({ where: { businessId } });

  console.log(`  general business ${businessId}:`, {
    cancellations: cancellations.count,
    payments: payments.count,
    subscriptions: subscriptions.count,
    guests: guests.count,
    memberships: memberships.count,
    quotationIndex: quotationIndex.count,
    saleShares: saleShares.count,
    deleted: business.businessName,
  });
}

async function deleteUserFromGeneral(userId) {
  const ownedBusinesses = await general.business.count({
    where: { createdByUserId: userId },
  });
  if (ownedBusinesses > 0) {
    throw new Error(`User ${userId} still owns ${ownedBusinesses} business(es)`);
  }

  const tickets = await general.ticket.findMany({
    where: { createdByUserId: userId },
    select: { ticketId: true },
  });
  const ticketIds = tickets.map((ticket) => ticket.ticketId);

  const ticketDetailsByTicket = await general.ticketDetail.deleteMany({
    where: { ticketId: { in: ticketIds } },
  });
  const ticketDetailsByUser = await general.ticketDetail.deleteMany({
    where: { createdByUserId: userId },
  });
  const ticketsDeleted = await general.ticket.deleteMany({
    where: { createdByUserId: userId },
  });

  const cancellations = await general.subscriptionCancellation.deleteMany({
    where: { cancelledByUserId: userId },
  });
  const payments = await general.subscriptionPayment.deleteMany({
    where: { createdByUserId: userId },
  });

  const userSubscriptions = await general.subscription.findMany({
    where: { createdByUserId: userId },
    select: { subscriptionId: true },
  });
  for (const subscription of userSubscriptions) {
    await general.subscriptionCancellation.deleteMany({
      where: { subscriptionId: subscription.subscriptionId },
    });
    await general.subscriptionPayment.deleteMany({
      where: { subscriptionId: subscription.subscriptionId },
    });
  }
  const subscriptions = await general.subscription.deleteMany({
    where: { createdByUserId: userId },
  });

  const campaigns = await general.platformEmailCampaign.deleteMany({
    where: { createdByUserId: userId },
  });
  const agentTasks = await general.platformAgentTask.deleteMany({
    where: { createdByUserId: userId },
  });
  const guests = await general.userGuest.deleteMany({
    where: { userGuestUserId: userId },
  });
  const memberships = await general.userBusiness.deleteMany({
    where: { userBusinessUserId: userId },
  });

  const user = await general.user.delete({ where: { userId } });

  console.log(`  general user ${userId}:`, {
    ticketDetailsByTicket: ticketDetailsByTicket.count,
    ticketDetailsByUser: ticketDetailsByUser.count,
    tickets: ticketsDeleted.count,
    cancellations: cancellations.count,
    payments: payments.count,
    subscriptions: subscriptions.count,
    campaigns: campaigns.count,
    agentTasks: agentTasks.count,
    guests: guests.count,
    memberships: memberships.count,
    deleted: `${user.userFirstName} ${user.userLastName} <${user.userEmail}>`,
  });
}

async function main() {
  console.log(dryRun ? "DRY RUN — no changes" : "LIVE DELETE");

  const businesses = await general.business.findMany({
    where: { businessId: { in: BUSINESS_IDS } },
    select: { businessId: true, businessName: true, businessDatabaseMode: true },
  });
  const users = await general.user.findMany({
    where: { userId: { in: USER_IDS } },
    select: { userId: true, userFirstName: true, userLastName: true, userEmail: true },
  });

  console.log("Targets:");
  console.log("  businesses:", businesses);
  console.log("  users:", users);

  if (dryRun) return;

  for (const businessId of BUSINESS_IDS) {
    console.log(`\nDeleting shared tenant data for ${businessId}...`);
    await deleteSharedTenantData(businessId);
  }

  for (const businessId of BUSINESS_IDS) {
    console.log(`\nDeleting general business ${businessId}...`);
    await deleteBusinessFromGeneral(businessId);
  }

  for (const userId of USER_IDS) {
    const exists = await general.user.findUnique({ where: { userId } });
    if (!exists) {
      console.log(`\nSkipping user ${userId} (not found)`);
      continue;
    }
    console.log(`\nDeleting general user ${userId}...`);
    await deleteUserFromGeneral(userId);
  }

  console.log("\nDone.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await general.$disconnect();
    await shared.$disconnect();
  });
