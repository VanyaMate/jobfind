import {
    type TypeGuard,
    isObject,
    isString, isNumber, isBoolean, isArray,
} from '@vanyamate/types-kit';
import type { Company } from '~/types/company/company';
import { isCompany } from '~/types/company/company';
import { isEnumValueOf } from '~/types/common/isEnumValueOf';


export enum SalaryType {
    EQUAL = 'EQUAL',
    FROM  = 'FROM',
    UP_TO = 'UP_TO',
}

export enum VacancyTypeOfEmployment {
    FULL_TIME  = 'FULL_TIME',
    PART_TIME  = 'PART_TIME',
    PROJECT    = 'PROJECT',
    VOLUNTEER  = 'VOLUNTEER',
    AGREEMENT  = 'AGREEMENT',
    INDIVIDUAL = 'INDIVIDUAL',
}

export enum VacancyFormat {
    OFFICE = 'OFFICE',
    REMOTE = 'REMOTE',
}

export type Vacancy = {
    id: string;
    title: string;
    description: string;

    salaryMin: number;
    salaryMax: number;
    salaryAfterTaxes: boolean;
    salaryType: SalaryType;
    paymentPerMonth: number;

    experienceFrom: number;
    experienceTo: number;
    typeOfEmployment: VacancyTypeOfEmployment;
    format: VacancyFormat;
    scheduleTypes: Array<String>;
    workFrom: number;
    workTo: number;

    tags: Array<string>;

    company: Company;
    createdAt: number;
    updatedAt: number;
}

export const isVacancy: TypeGuard<Vacancy> = function (data): data is Vacancy {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['title']) &&
        isString(data['description']) &&
        isNumber(data['salaryMin']) &&
        isNumber(data['salaryMax']) &&
        isBoolean(data['salaryAfterTaxes']) &&
        isEnumValueOf(SalaryType, data['salaryType']) &&
        isNumber(data['paymentPerMonth']) &&
        isNumber(data['experienceFrom']) &&
        isNumber(data['experienceTo']) &&
        isEnumValueOf(VacancyTypeOfEmployment, data['experienceTo']) &&
        isEnumValueOf(VacancyFormat, data['format']) &&
        isArray(data['scheduleTypes'], isString) &&
        isNumber(data['workFrom']) &&
        isNumber(data['workTo']) &&
        isArray(data['tags'], isString) &&
        isCompany(data['company']) &&
        isNumber(data['createdAt']) &&
        isNumber(data['updatedAt'])
    );
};