import {
    type TypeGuard,
    isObject,
    isString,
} from '@vanyamate/types-kit';


export type CompanyBranch = {
    id: string;
    name: string;
    description: string;
    avatar: string;
}

export const isCompanyBranch: TypeGuard<CompanyBranch> = function (data): data is CompanyBranch {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['name']) &&
        isString(data['description']) &&
        isString(data['avatar'])
    );
};