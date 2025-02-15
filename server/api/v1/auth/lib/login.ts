import { EventHandlerRequest, H3Event } from 'h3';
import { LoginData } from '~/types/authorization/login-data';
import {
    getUserByEmailOrLogin,
} from '~/server/api/v1/user/lib/getUserByEmailOrLogin';
import { comparePassword } from '~/server/api/v1/auth/lib/comparePassword';
import {
    nonValidPasswordResponse,
} from '~/server/api/v1/auth/responses/non-valid-password.response';
import {
    userNotExistResponse,
} from '~/server/api/v1/auth/responses/user-not-exist.response';
import { authorizeLikeUser } from '~/server/api/v1/auth/authorizeLikeUser';


export const login = async function (event: H3Event<EventHandlerRequest>, loginData: LoginData, isOAuth: boolean = false) {
    const user = await getUserByEmailOrLogin(loginData.login, loginData.login);

    if (user) {
        if (isOAuth || comparePassword(loginData.password, user.password)) {
            return authorizeLikeUser(event, user, loginData.remember);
        }

        return nonValidPasswordResponse(event);
    }

    return userNotExistResponse(event);
};