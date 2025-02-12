import {
    type TypeGuard,
    isObject,
    isString, isBoolean,
} from '@vanyamate/types-kit';


export type RegistrationData = {
    login: string;
    password: string;
    remember: boolean;
}

export const isRegistrationData: TypeGuard<RegistrationData> = function (data): data is RegistrationData {
    return (
        isObject(data) &&
        isString(data['login']) &&
        isString(data['password']) &&
        isBoolean(data['remember'])
    );
};