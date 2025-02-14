import { EventHandlerRequest, H3Event } from 'h3';
import { isLoginData, LoginData } from '~/types/authorization/login-data';
import { prisma } from '~/server/utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ms from 'ms';


export const login = async function (event: H3Event<EventHandlerRequest>, loginData: LoginData, isOauth: boolean = false) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: loginData.login,
                },
                {
                    login: loginData.login,
                },
            ],
        },
    });

    if (user) {
        if (isOauth || bcrypt.compareSync(loginData.password, user.password)) {
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
        }

        setResponseStatus(event, 400);
        return {
            success: 'false',
            message: 'Non valid password',
        };
    }
    setResponseStatus(event, 400);
    return {
        success: 'false',
        message: 'User not exist',
    };
};