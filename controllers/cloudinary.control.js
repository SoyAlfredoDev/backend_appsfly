import { deleteCloudinaryImageService } from '../services/cloudinaryService.js';

/**
 * Deletes an image from Cloudinary based on its full URL.
 * @param {string} imageUrl - Full Cloudinary image URL.
 * @param {string} [folder='expense_receipts'] - Folder where the image is stored (optional).
 * @returns {Promise<object>} - A success message if the image is deleted.
 */
export const deleteExpenseImageController = async (imageUrl, folder = 'expense_receipts') => {
    try {
        if (!imageUrl) {
            console.warn('⚠️ No image URL provided for deletion.');
            return;
        }
        // Extract the public_id from the URL (without extension)
        const publicId = imageUrl.split('/').pop().split('.')[0];
        // Call the Cloudinary deletion service
        const res = await deleteCloudinaryImageService(`${folder}/${publicId}`);
        return { message: 'Image successfully deleted from Cloudinary' };
    } catch (error) {
        console.error('❌ Error deleting image:', error);
        throw new Error('Internal error while deleting image from Cloudinary');
    }
};
