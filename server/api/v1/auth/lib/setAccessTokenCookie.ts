import { EventHandlerRequest, H3Event } from 'h3';
import ms from 'ms';


export const setAccessTokenCookie = function (event: H3Event<EventHandlerRequest>, token: string, remember: boolean = false) {
    setCookie(event, 'access-token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure  : true,
        maxAge  : remember ? ms('1h') : undefined,
    });
};