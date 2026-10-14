import { generalPrisma as general } from '../../dbGeneral.js';
import { getMercadoPagoPayment } from './mpApiClient.js';
import { finalizeMercadoPagoPayment } from '../subscriptionPaymentService.js';
import { processRecurringAuthorization, processRecurringInvoice } from '../billing/recurringWebhook.js';
import { deliverBillingNotice } from '../billing/billingNotifications.js';

export async function processMercadoPagoWebhookNotification({topic, resourceId}) {
  if (!resourceId) return {processed:false, reason:'MISSING_RESOURCE_ID'};
  if (topic === 'subscription_preapproval') return processRecurringAuthorization(String(resourceId));
  if (topic === 'subscription_authorized_payment') return processRecurringInvoice(String(resourceId));
  if (topic !== 'payment') return {processed:false, reason:'TOPIC_IGNORED'};
  const remote = await getMercadoPagoPayment(String(resourceId));
  if (!remote.external_reference) return {processed:false,reason:'NO_EXTERNAL_REFERENCE'};
  const record = await general.subscriptionPayment.findUnique({where:{subscriptionPaymentId:String(remote.external_reference)}});
  if (!record) return {processed:false,reason:'PAYMENT_RECORD_NOT_FOUND'};
  // Recurring payments use the invoice, so card validation cannot activate a plan.
  if (record.metadata?.mpPreapprovalId) return {processed:true,reason:'AWAITING_RECURRING_INVOICE'};
  const result = await finalizeMercadoPagoPayment({subscriptionPaymentId:record.subscriptionPaymentId,mpPaymentId:String(resourceId)});
  if(result.payment.status === 'APPROVED' && result.subscription) await deliverBillingNotice(result.payment.subscriptionPaymentId,'paid',result.subscription.subscriptionEndDate);
  return {processed:true,reason:result.payment.status};
}
