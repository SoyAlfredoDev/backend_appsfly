import prisma from '../prismaClient.js';
import { createBusiness, getBusiness } from '../services/businessService.js';

const business = async (data) => {
    const res = await createBusiness(data)
    console.log('>>>>> res: ', res)
}

const get = async () => {
    const bs = await getBusiness()
    console.log('>>>>> business: ', bs)
}