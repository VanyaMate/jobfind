import {
    type TypeGuard,
    isObject,
    isString,
} from '@vanyamate/types-kit';


export type Company = {
    id: string;
    name: string;
    description: string;
    avatar: string;
}

export const isCompany: TypeGuard<Company> = function (data): data is Company {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['name']) &&
        isString(data['description']) &&
        isString(data['avatar'])
    );
};