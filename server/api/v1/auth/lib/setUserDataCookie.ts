import { User } from '~/types/user/user';
import { EventHandlerRequest, H3Event } from 'h3';
import ms from 'ms';


export const setUserDataCookie = function (event: H3Event<EventHandlerRequest>, userData: User, remember: boolean = false) {
    setCookie(event, 'user-data', JSON.stringify(userData), {
        httpOnly: false,
        sameSite: 'lax',
        secure  : true,
        maxAge  : remember ? ms('30d') : undefined,
    });
};