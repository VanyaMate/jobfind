import { EventHandlerRequest, H3Event } from 'h3';
import { User } from '@prisma/client';
import { createAccessToken } from '~/server/api/v1/auth/lib/createAccessToken';
import {
    createRefreshToken,
} from '~/server/api/v1/auth/lib/createRefreshToken';
import { getPublicUserData } from '~/server/api/v1/user/lib/getPublicUserData';
import {
    setAccessTokenCookie,
} from '~/server/api/v1/auth/lib/setAccessTokenCookie';
import {
    setRefreshTokenCookie,
} from '~/server/api/v1/auth/lib/setRefreshTokenCookie';
import { setUserDataCookie } from '~/server/api/v1/auth/lib/setUserDataCookie';
import { authResponse } from '~/server/api/v1/auth/responses/authResponse';


export const authorizeLikeUser = function (event: H3Event<EventHandlerRequest>, user: User, remember: boolean = false) {
    const accessToken  = createAccessToken(user.id);
    const refreshToken = createRefreshToken(accessToken);
    const userData     = getPublicUserData(user);

    setAccessTokenCookie(event, accessToken, remember);
    setRefreshTokenCookie(event, refreshToken, remember);
    setUserDataCookie(event, userData, remember);

    return authResponse(event, userData);
};