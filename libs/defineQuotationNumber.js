import { countQuotationsService } from '../services/quotationServices.js';

export default async function defineQuotationNumber(prisma) {
  try {
    const quotationsCount = await countQuotationsService(prisma);
    const nextQuotation = Number(quotationsCount) + 1;

    // Format the number with leading zeros (e.g., c00001, c00002...)
    const formattedQuotationNumber = String(nextQuotation).padStart(5, '0');

    return `c${formattedQuotationNumber}`;
  } catch (error) {
    console.error('Error defining quotation number:', error);
    throw error;
  }
}
