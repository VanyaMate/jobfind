import { EventHandlerRequest, H3Event } from 'h3';
import ms from 'ms';


export const setRefreshTokenCookie = function (event: H3Event<EventHandlerRequest>, token: string, remember: boolean = false) {
    setCookie(event, 'refresh-token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure  : true,
        maxAge  : remember ? ms('30d') : undefined,
    });
};