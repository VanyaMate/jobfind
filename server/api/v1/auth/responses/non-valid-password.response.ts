import { EventHandlerRequest, H3Event } from 'h3';
import { getInvalidResponse } from '~/server/lib/getInvalidResponse';
import {
    AUTH_NON_VALID_PASSWORD_CODE,
} from '~/server/api/v1/auth/codes/auth.codes';


export const nonValidPasswordResponse = function (event: H3Event<EventHandlerRequest>) {
    setResponseStatus(event, 400);
    return getInvalidResponse(AUTH_NON_VALID_PASSWORD_CODE);
};