import { isLoginData } from '~/types/authorization/login-data';
import { login } from '~/server/api/v1/auth/lib/login';


export default defineEventHandler(async (event) => {
    const body = await readBody<unknown>(event);
    const data = JSON.parse(body);

    if (isLoginData(data)) {
        return login(event, data);
    }

    setResponseStatus(event, 400);
    return {
        success: 'false',
        message: 'Not valid data',
    };
});