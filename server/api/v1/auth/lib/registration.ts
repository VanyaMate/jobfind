import { EventHandlerRequest, H3Event } from 'h3';
import { RegistrationData } from '~/types/authorization/registration-data';
import { authorizeLikeUser } from '~/server/api/v1/auth/authorizeLikeUser';
import {
    getUserByEmailOrLogin,
} from '~/server/api/v1/user/lib/getUserByEmailOrLogin';
import {
    userAlreadyExistResponse,
} from '~/server/api/v1/auth/responses/user-already-exist.response';
import { hashPassword } from '~/server/api/v1/auth/lib/hashPassword';
import { createUser } from '~/server/api/v1/user/lib/createUser';


export const registration = async function (event: H3Event<EventHandlerRequest>, registrationData: RegistrationData) {
    const { email, login, password } = registrationData;
    const existedUser                = await getUserByEmailOrLogin(email, login);

    if (existedUser) {
        return userAlreadyExistResponse(event);
    }

    const hash = password ? await hashPassword(password) : '';
    const user = await createUser({ ...registrationData, password: hash });

    return authorizeLikeUser(event, user);
};