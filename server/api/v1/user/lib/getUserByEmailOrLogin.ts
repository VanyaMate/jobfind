import { prisma } from '~/server/utils/prisma';


export const getUserByEmailOrLogin = function (email: string, login: string) {
    return prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { login },
            ],
        },
    });
};