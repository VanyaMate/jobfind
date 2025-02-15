import {
    type TypeGuard,
    isObject,
    isString,
    isBoolean,
    isOptional,
} from '@vanyamate/types-kit';


export type RegistrationData = {
    email: string;
    login: string;
    password: string;
    avatar?: string;
    remember: boolean;
}

export const isRegistrationData: TypeGuard<RegistrationData> = function (data): data is RegistrationData {
    return (
        isObject(data) &&
        isString(data['email']) &&
        isString(data['login']) &&
        isString(data['password']) &&
        isOptional(data['avatar'], isString) &&
        isBoolean(data['remember'])
    );
};