import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const deleteCloudinaryImageService = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error('No publicId provided for deletion.');
        }
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error(`>>>>> cloudinaryService ❌ Error deleting Cloudinary file: ${publicId}`, error);
        throw error;
    }
};

export default cloudinary;