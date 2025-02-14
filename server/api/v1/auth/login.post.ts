import { isLoginData } from '~/types/authorization/login-data';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { prisma } from '~/server/utils/prisma';


export default defineEventHandler(async (event) => {
    const body = await readBody<unknown>(event);
    const data = JSON.parse(body);

    if (isLoginData(data)) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: data.login,
                    },
                    {
                        login: data.login,
                    },
                ],
            },
        });

        if (user) {
            if (bcrypt.compareSync(data.password, user.password)) {
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
    }

    setResponseStatus(event, 400);
    return {
        success: 'false',
        message: 'Not valid data',
    };
});