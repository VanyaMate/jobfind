import { isRegistrationData } from '~/types/authorization/registration-data';
import { registration } from '~/server/api/v1/auth/lib/registration';
import {
    nonValidDataResponse,
} from '~/server/responses/non-valid-data.response';
import { getJsonFromEvent } from '~/server/lib/getJsonFromEvent';


export default defineEventHandler(async (event) => {
    const data = await getJsonFromEvent(event);

    if (isRegistrationData(data)) {
        return registration(event, data);
    }

    return nonValidDataResponse(event);
});