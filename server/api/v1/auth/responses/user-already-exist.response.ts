import { EventHandlerRequest, H3Event } from 'h3';
import { getInvalidResponse } from '~/server/lib/getInvalidResponse';
import {
    AUTH_USER_ALREADY_EXIST_CODE,
} from '~/server/api/v1/auth/codes/auth.codes';


export const userAlreadyExistResponse = function (event: H3Event<EventHandlerRequest>) {
    setResponseStatus(event, 400);
    return getInvalidResponse(AUTH_USER_ALREADY_EXIST_CODE);
};