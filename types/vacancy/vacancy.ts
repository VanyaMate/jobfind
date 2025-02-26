import {
    type TypeGuard,
    isObject,
    isString, isNumber, isBoolean, isArray,
} from '@vanyamate/types-kit';
import type { Company } from '~/types/company/company';
import { isCompany } from '~/types/company/company';
import { isEnumValueOf } from '~/types/common/isEnumValueOf';


export enum SalaryCurrency {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR',
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

export enum VacancyEducationType {
    NONE      = 'NONE',
    HIGHER    = 'HIGHER',
    SECONDARY = 'SECONDARY',
}

export enum VacancySortType {
    CREATED_AT   = 'CREATED_AT',
    SALARY_GROSS = 'SALARY_GROSS',
    SALARY_LESS  = 'SALARY_LESS',
}

export enum VacancyCreatedAtType {
    DAY     = 'DAY',
    TWO_DAY = 'TWO_DAY',
    WEAK    = 'WEAK',
    MONTH   = 'MONTH',
}

export type Vacancy = {
    id: string;
    title: string;
    description: string;

    salaryMin: number;
    salaryMax: number;
    salaryAfterTaxes: boolean;
    salaryCurrency: SalaryCurrency;
    paymentPerMonth: number;

    experienceFrom: number;
    typeOfEmployment: VacancyTypeOfEmployment;
    formats: Array<VacancyFormat>;
    scheduleTypes: Array<String>;
    workFrom: number;
    workTo: number;

    education: VacancyEducationType;

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
        isEnumValueOf(SalaryCurrency, data['salaryType']) &&
        isNumber(data['paymentPerMonth']) &&
        isNumber(data['experienceFrom']) &&
        isEnumValueOf(VacancyTypeOfEmployment, data['typeOfEmployment']) &&
        isArray(data['formats'], (value): value is VacancyFormat => isEnumValueOf(VacancyFormat, value)) &&
        isArray(data['scheduleTypes'], isString) &&
        isNumber(data['workFrom']) &&
        isNumber(data['workTo']) &&
        isEnumValueOf(VacancyEducationType, data['education']) &&
        isArray(data['tags'], isString) &&
        isCompany(data['company']) &&
        isNumber(data['createdAt']) &&
        isNumber(data['updatedAt'])
    );
};