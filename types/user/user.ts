import {
    type TypeGuard,
    isObject,
    isString,
} from '@vanyamate/types-kit';


export type User = {
    id: string;
    login: string;
    email: string;
    avatar: string;
}

export const isUser: TypeGuard<User> = function (data): data is User {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['login']) &&
        isString(data['email']) &&
        isString(data['avatar'])
    );
};