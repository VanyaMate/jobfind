import {
    type TypeGuard,
    isObject,
    isString, isOptional, isArray, isNumber,
} from '@vanyamate/types-kit';


export type Company = {
    id: string;
    title: string;
    description: string;
    logo: string;
    parent?: Company;
    branches: Array<Company>;
    createdAt: number;
}

export const isCompany: TypeGuard<Company> = function (data): data is Company {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['title']) &&
        isString(data['description']) &&
        isString(data['logo']) &&
        isNumber(data['createdAt']) &&
        isOptional(data['parent'], isCompany) &&
        isArray(data['branches'], isCompany)
    );
};