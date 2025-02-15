import type { RegistrationData } from '~/types/authorization/registration-data';
import type { User } from '~/types/user/user';


export const registrationAction = async function (registrationData: RegistrationData): Promise<User> {
    return fetch('/api/v1/auth/registration', {
        method     : 'POST',
        body       : JSON.stringify(registrationData),
        credentials: 'same-origin',
        headers    : {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json());
};