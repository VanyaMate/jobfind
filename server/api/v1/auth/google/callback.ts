import { H3Event } from 'h3';
import { login } from '~/server/api/v1/auth/lib/login';
import { registration } from '~/server/api/v1/auth/lib/registration';
import {
    getOauthGoogleTokens,
} from '~/server/api/v1/auth/google/lib/getOauthGoogleTokens';
import {
    getOauthGoogleUser,
} from '~/server/api/v1/auth/google/lib/getOauthGoogleUser';
import { getUserByEmail } from '~/server/api/v1/user/lib/getUserByEmail';
import { getLoginByEmail } from '~/server/api/v1/auth/lib/getLoginByEmail';
import { authorizeLikeUser } from '~/server/api/v1/auth/authorizeLikeUser';


export default defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const code  = query.code as string;

    if (!code) {
        await sendRedirect(event, '/login');
        return;
    }

    const tokenResponse = await getOauthGoogleTokens(code);

    if (!tokenResponse.access_token) {
        await sendRedirect(event, '/login');
        return;
    }

    const userResponse = await getOauthGoogleUser(tokenResponse.access_token);
    const user         = await getUserByEmail(userResponse.email);

    const response = user ?
                     authorizeLikeUser(event, user, true) :
                     await registration(event, {
                         login   : getLoginByEmail(userResponse.email),
                         email   : userResponse.email,
                         password: '',
                         remember: true,
                     });
    setResponseStatus(event, 200);
    await sendRedirect(event, '/');
    return response;
});