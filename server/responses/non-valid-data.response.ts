import { EventHandlerRequest, H3Event } from 'h3';
import { getInvalidResponse } from '~/server/lib/getInvalidResponse';
import { NON_VALID_DATA_CODE } from '~/server/codes/codes';


export const nonValidDataResponse = function (event: H3Event<EventHandlerRequest>) {
    setResponseStatus(event, 400);
    return getInvalidResponse(NON_VALID_DATA_CODE);
};