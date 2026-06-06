import dotenv from 'dotenv';
dotenv.config();
const getSuperAdmins = () => {
    const envIds = process.env.SUPER_ADMIN_IDS;
    if (!envIds) return [];
    return envIds.split(',').map(id => id.trim()).filter(id => id);
};

const userSuperAdmin = getSuperAdmins();

export default userSuperAdmin;