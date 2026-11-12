export const GENERAL_BUSINESS_TYPE = "general";
export const CLOTHING_BUSINESS_TYPE = "clothing_store";

export function usesRetailSales(businessType: unknown) {
  return businessType === GENERAL_BUSINESS_TYPE || businessType === CLOTHING_BUSINESS_TYPE;
}
