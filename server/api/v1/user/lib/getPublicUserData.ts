import { User as PrismaUser } from '@prisma/client';
import { User } from '~/types/user/user.types';


export const getPublicUserData = function (prismaUser: PrismaUser): User {
    return {
        id    : prismaUser.id,
        login : prismaUser.login,
        email : prismaUser.email,
        avatar: prismaUser.avatar,
    };
};