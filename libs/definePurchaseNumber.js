import { countPurchasesService } from '../services/purchaseServices.js';

export default async function definePurchaseNumber(prisma) {
  try {
    const purchasesCount = await countPurchasesService(prisma);
    const nextPurchase = Number(purchasesCount) + 1;

    // Determine the letter based on the range of 10,000
    const letterIndex = Math.floor((nextPurchase - 1) / 10000);
    const letter = String.fromCharCode(97 + letterIndex); // 97 = 'a'

    // Format the number with leading zeros (max 5 digits)
    const formattedPurchaseNumber = String(nextPurchase % 10000 || 10000).padStart(5, '0');

    return `${letter}${formattedPurchaseNumber}`;
  } catch (error) {
    console.error('Error defining purchase number:', error);
    throw error;
  }
};
