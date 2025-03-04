import {
    type TypeGuard,
    type TypeAssert,
    isObject,
    isString, isOptional,
} from '@vanyamate/types-kit';


export type CompanyCreateData = {
    title: string;
    description: string;
    logo?: File;
}

export const isCompanyCreateData: TypeGuard<CompanyCreateData> = function (data): data is CompanyCreateData {
    return (
        isObject(data) &&
        isString(data['title']) &&
        isString(data['description']) &&
        isOptional(data['logo'], (value: unknown): value is File => value instanceof File)
    );
};

export const assertCompanyCreateData: TypeAssert<CompanyCreateData> = function (data, errorMessage) {
    if (!isCompanyCreateData(data)) {
        throw errorMessage(data);
    }
};