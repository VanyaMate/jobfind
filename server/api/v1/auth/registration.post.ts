import { isRegistrationData } from '~/types/authorization/registration-data';
import { registration } from '~/server/api/v1/auth/lib/registration';


export default defineEventHandler(async (event) => {
    const body = await readBody<unknown>(event);
    const data = JSON.parse(body);

    if (isRegistrationData(data)) {
        return registration(event, data);
    }

    setResponseStatus(event, 400);
    return {
        success: 'false',
        message: 'Not valid data',
    };
});