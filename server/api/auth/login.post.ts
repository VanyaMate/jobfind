import { isLoginData } from '~/types/authorization/login-data';


export default defineEventHandler(async (event) => {
    const body = await readBody<unknown>(event);
    const data = JSON.parse(body);

    console.log('Data is ', data);

    if (isLoginData(data)) {
        setCookie(event, 'access-token', data.login, {
            httpOnly: true,
            sameSite: 'none',
            secure  : true,
            maxAge  : 1000 * 60 * 60 * 24,
        });
        return {
            success: true,
        };
    }

    setResponseStatus(event, 400);
    return {
        success: 'false',
        message: 'Unauthorize',
    };
});