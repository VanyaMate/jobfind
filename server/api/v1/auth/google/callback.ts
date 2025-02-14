import { H3Event } from 'h3';
import { prisma } from '~/server/utils/prisma';
import { login } from '~/server/api/v1/auth/lib/login';
import { registration } from '~/server/api/v1/auth/lib/registration';


export default defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const code  = query.code as string;

    if (!code) {
        throw createError({
            statusCode: 400, message: 'Authorization code is missing',
        });
    }

    const tokenResponse: any = await $fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body  : {
            client_id    : process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            code,
            grant_type   : 'authorization_code',
            redirect_uri : 'http://localhost:3000/api/v1/auth/google/callback',
        },
    });

    if (!tokenResponse.access_token) {
        throw createError({
            statusCode: 401,
            message   : 'Failed to obtain access token',
        });
    }

    const userResponse = await $fetch<{
        email: string,
        picture: string,
    }>('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${ tokenResponse.access_token }`,
        },
    });

    const user = await prisma.user.findFirst({
        where: {
            email: userResponse.email,
        },
    });

    if (user) {
        const response = await login(event, {
            login: user.email, password: '', remember: false,
        });
        await sendRedirect(event, '/');
        return response;
    } else {
        const response = await registration(event, {
            login   : '',
            email   : userResponse.email,
            password: '',
            remember: false,
        });
        await sendRedirect(event, '/');
        return response;
    }
});