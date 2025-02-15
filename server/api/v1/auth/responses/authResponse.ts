import { EventHandlerRequest, H3Event } from 'h3';
import { getValidResponse } from '~/server/lib/getValidResponse';
import { User } from '~/types/user/user';


export const authResponse = function (event: H3Event<EventHandlerRequest>, userData: User) {
    setResponseStatus(event, 200);
    return getValidResponse(userData);
};