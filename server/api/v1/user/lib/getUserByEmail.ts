import { prisma } from '~/server/utils/prisma';


export const getUserByEmail = function (email: string) {
    return prisma.user.findFirst({
        where: { email },
    });
};