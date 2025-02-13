import { defineNuxtPlugin } from '#app';
import { PrismaClient } from '@prisma/client';


export default defineNuxtPlugin((nuxt) => {
    const prisma = new PrismaClient();

    nuxt.hook('app:created', () => {
        prisma.$connect();
    });

    return {
        provide: {
            prisma,
        },
    };
});