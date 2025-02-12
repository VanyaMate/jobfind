import {
    type TypeGuard,
    isObject,
    isString,
    isBoolean,
} from '@vanyamate/types-kit';


export type LoginData = {
    login: string;
    password: string;
    remember: boolean;
}

export const isLoginData: TypeGuard<LoginData> = function (data): data is LoginData {
    return (
        isObject(data) &&
        isString(data['login']) &&
        isString(data['password']) &&
        isBoolean(data['remember'])
    );
};