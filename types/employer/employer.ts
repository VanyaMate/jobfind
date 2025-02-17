import {
    type TypeGuard,
    isObject,
    isString,
} from '@vanyamate/types-kit';


export type Employer = {
    id: string;
    login: string;
    email: string;
    avatar: string;
}

export const isEmployer: TypeGuard<Employer> = function (data): data is Employer {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['login']) &&
        isString(data['email']) &&
        isString(data['avatar'])
    );
};