import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts the Cloudinary public_id (including folder path) from a secure_url.
 * Handles version prefixes (v1234567890) and common transformation segments.
 */
export function extractPublicIdFromCloudinaryUrl(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') return null;
    if (!imageUrl.includes('cloudinary.com')) return null;

    const uploadMarker = '/upload/';
    const uploadIndex = imageUrl.indexOf(uploadMarker);
    if (uploadIndex === -1) return null;

    let pathAfterUpload = imageUrl.slice(uploadIndex + uploadMarker.length);
    pathAfterUpload = pathAfterUpload.split('?')[0];

    const segments = pathAfterUpload.split('/');
    const lastIndex = segments.length - 1;
    segments[lastIndex] = segments[lastIndex].replace(/\.[^/.]+$/, '');

    const isSkippableSegment = (segment) => {
        if (!segment) return true;
        if (/^v\d+$/.test(segment)) return true;
        if (segment.includes(',')) return true;
        if (/^[a-z]_/.test(segment)) return true;
        if (/^fl_/.test(segment)) return true;
        return false;
    };

    while (segments.length > 1 && isSkippableSegment(segments[0])) {
        segments.shift();
    }

    if (segments.length === 0) return null;
    return segments.join('/');
}

export const deleteCloudinaryImageService = async (publicId) => {
    if (!publicId) {
        throw new Error('No publicId provided for deletion.');
    }
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
};

/**
 * Best-effort deletion by full Cloudinary URL. Does not throw — logs and returns null on failure.
 */
export async function deleteCloudinaryImageByUrl(imageUrl) {
    const publicId = extractPublicIdFromCloudinaryUrl(imageUrl);
    if (!publicId) {
        console.warn('⚠️ Could not extract public_id from URL:', imageUrl);
        return null;
    }

    try {
        const result = await deleteCloudinaryImageService(publicId);
        if (result?.result === 'not found') {
            console.warn(`⚠️ Cloudinary image not found: ${publicId}`);
        }
        return result;
    } catch (error) {
        console.error(`⚠️ Failed to delete Cloudinary image (${publicId}):`, error.message);
        return null;
    }
}

/**
 * Deletes the previous image when a record's image URL is replaced or cleared.
 */
export async function deleteCloudinaryImageIfReplaced(oldUrl, newUrl) {
    const normalizedOld = oldUrl?.trim() || null;
    const normalizedNew = newUrl?.trim() || null;
    if (!normalizedOld || normalizedOld === normalizedNew) return null;

    const oldPublicId = extractPublicIdFromCloudinaryUrl(normalizedOld);
    const newPublicId = extractPublicIdFromCloudinaryUrl(normalizedNew);
    if (oldPublicId && newPublicId && oldPublicId === newPublicId) return null;

    return deleteCloudinaryImageByUrl(normalizedOld);
}

export default cloudinary;
