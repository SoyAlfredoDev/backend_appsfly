import { countSalesService } from '../services/salesServices.js';

export default async function defineSaleNumber(prisma) {
  try {
    const salesCount = await countSalesService(prisma);
    const nextSale = Number(salesCount) + 1;

    // Determine the letter based on the range of 10,000
    const letterIndex = Math.floor((nextSale - 1) / 10000);
    const letter = String.fromCharCode(97 + letterIndex); // 97 = 'a'

    // Format the number with leading zeros (max 5 digits)
    const formattedSaleNumber = String(nextSale % 10000 || 10000).padStart(5, '0');

    return `${letter}${formattedSaleNumber}`;
  } catch (error) {
    console.error('Error defining sale number:', error);
    throw error;
  }
};