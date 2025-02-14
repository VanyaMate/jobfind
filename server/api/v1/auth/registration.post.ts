import { isRegistrationData } from '~/types/authorization/registration-data';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { prisma } from '~/server/utils/prisma';


export default defineEventHandler(async (event) => {
    const body = await readBody<unknown>(event);
    const data = JSON.parse(body);

    if (isRegistrationData(data)) {
        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: data.email,
                    },
                    {
                        login: data.login,
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


        const hashPassword = await bcrypt.hash(data.password, 4);
        const user         = await prisma.user.create({
            data: {
                email   : data.email,
                login   : data.login,
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
    }

    setResponseStatus(event, 400);
    return {
        success: 'false',
        message: 'Not valid data',
    };
});