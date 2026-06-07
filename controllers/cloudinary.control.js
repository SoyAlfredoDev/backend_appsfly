import { deleteCloudinaryImageByUrl } from '../services/cloudinaryService.js';

/**
 * @deprecated Use deleteCloudinaryImageByUrl from cloudinaryService directly.
 */
export const deleteExpenseImageController = async (imageUrl) => {
    return deleteCloudinaryImageByUrl(imageUrl);
};
