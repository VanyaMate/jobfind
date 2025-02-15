import { isLoginData, LoginData } from '~/types/authorization/login-data';
import { login } from '~/server/api/v1/auth/lib/login';
import {
    nonValidDataResponse,
} from '~/server/responses/non-valid-data.response';
import { getJsonFromEvent } from '~/server/lib/getJsonFromEvent';


export default defineEventHandler(async (event) => {
    const loginData = await getJsonFromEvent<LoginData>(event);

    if (isLoginData(loginData)) {
        return login(event, loginData);
    }

    return nonValidDataResponse(event);
});