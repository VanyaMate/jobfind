import { EventHandlerRequest, H3Event } from 'h3';
import { prisma } from '~/server/utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { RegistrationData } from '~/types/authorization/registration-data';
import { randomUUID } from 'node:crypto';


export const registration = async function (event: H3Event<EventHandlerRequest>, registrationData: RegistrationData, isOauth: boolean = false) {
    const existedUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: registrationData.email,
                },
                {
                    login: registrationData.login,
                },
            ],
        },
    });

    if (existedUser) {
        setResponseStatus(event, 400);
        return {
            success: 'false',
            message: 'User already exist',
        };
    }


    const hashPassword = isOauth ? ''
                                 : await bcrypt.hash(registrationData.password, 4);
    const user         = await prisma.user.create({
        data: {
            email   : registrationData.email,
            login   : registrationData.login ? registrationData.login
                                             : registrationData.email.split('@')[0] + '-' + randomUUID().slice(0, 6),
            password: hashPassword,
        },
    });

    const accessToken  = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ token: accessToken }, 'secret', { expiresIn: '30d' });

    setCookie(event, 'access-token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure  : true,
        maxAge  : ms('1h'),
    });
    setCookie(event, 'refresh-token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure  : true,
        maxAge  : ms('30d'),
    });
    const response = {
        id    : user.id,
        login : user.login,
        email : user.email,
        avatar: user.avatar,
    };
    setCookie(event, 'user-data', JSON.stringify(response), {
        httpOnly: false,
        sameSite: 'lax',
        secure  : true,
        maxAge  : ms('30d'),
    });
    setResponseStatus(event, 200);
    return {
        success: true,
        data   : response,
    };
};