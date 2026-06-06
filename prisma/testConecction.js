import prisma from '../prismaClient.js';
import { createBusiness, getBusiness } from '../services/businessService.js';

const business = async (data) => {
    const res = await createBusiness(data)

}

const get = async () => {
    const bs = await getBusiness()

}


// deberia agregar esto en la vista admin para confimar que esta conectada  