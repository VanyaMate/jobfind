import type { LoginData } from '~/types/authorization/login-data';
import type { User } from '~/types/user/user';
import { isUser } from '~/types/user/user';
import type { ValidResponse } from '~/types/common/valid-response';


export const loginAction = async function (loginData: LoginData): Promise<User> {
    return $fetch<ValidResponse>('/api/v1/auth/login', {
        method     : 'POST',
        body       : JSON.stringify(loginData),
        headers    : {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
        .then((response) => {
            if (isUser(response.data)) {
                return response.data;
            }

            throw 'Error';
        });
};