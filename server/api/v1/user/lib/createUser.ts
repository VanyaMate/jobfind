import { RegistrationData } from '~/types/authorization/registration-data';
import { User } from '@prisma/client';


export const createUser = function (data: RegistrationData): Promise<User> {
    return prisma.user.create({
        data: {
            email   : data.email,
            password: data.password,
            login   : data.login,
            avatar  : data.avatar ?? '',
        },
    });
};