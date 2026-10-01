import { PrismaClient } from "../../src/generated/business/index.js";

// register user-business in businessDB
export const registerUserBusinessServiceBusinessDB = async (data, prismaURL) => {
  let prisma;
  let ownsClient = false;
  try {
    if (typeof prismaURL === "string") {
      prisma = new PrismaClient({
        datasources: {
          db: { url: prismaURL },
        },
      });
      ownsClient = true;
    } else {
      prisma = prismaURL;
    }
    if (!prisma) throw new Error("Prisma tenant client is required");
    const userBusiness = await prisma.user.create({ data });
    return userBusiness;
  } catch (error) {
    console.error(">>>>>> (userBusinessService.js)_ Error creating userbusiness:", error);
    throw error;
  } finally {
    if (ownsClient && prisma) await prisma.$disconnect();
  }
};
