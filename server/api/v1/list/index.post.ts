import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return prisma.item.create({ data: { text: body } });
});
