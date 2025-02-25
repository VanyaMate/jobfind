import {
    type TypeGuard,
    isObject,
    isString, isOptional, isNumber, isBoolean, isArray,
} from '@vanyamate/types-kit';
import { SalaryCurrency } from '~/types/vacancy/vacancy';
import {
    VacancyEducationType,
    VacancyFormat,
    VacancyTypeOfEmployment,
} from '~/types/vacancy/vacancy';
import { isEnumValueOf } from '~/types/common/isEnumValueOf';


export type VacancyFilter = {
    title?: string;
    salaryMin?: number;
    salaryAfterTax?: boolean;
    salaryExist?: boolean;
    salaryType?: SalaryCurrency;
    paymentPerMonth?: number;
    experienceFrom?: number;
    typeOfEmployment?: Array<VacancyTypeOfEmployment>;
    format?: Array<VacancyFormat>;
    scheduleTypes?: Array<string>;
    tags: string;
    excludeWords?: string;
    education?: Array<VacancyEducationType>;
    createdFrom?: number;
}

export const isVacancyFilter: TypeGuard<VacancyFilter> = function (data): data is VacancyFilter {
    return (
        isObject(data) &&
        isOptional(data['title'], isString) &&
        isOptional(data['salaryMin'], isNumber) &&
        isOptional(data['salaryAfterTax'], isBoolean) &&
        isOptional(data['salaryExist'], isBoolean) &&
        isOptional(data['salaryType'], (value): value is SalaryCurrency => isEnumValueOf(SalaryCurrency, value)) &&
        isOptional(data['paymentPerMonth'], isNumber) &&
        isOptional(data['experienceFrom'], isNumber) &&
        isOptional(data['typeOfEmployment'], (value): value is Array<VacancyTypeOfEmployment> => isArray(value, (value): value is VacancyTypeOfEmployment => isEnumValueOf(VacancyTypeOfEmployment, value))) &&
        isOptional(data['format'], (value): value is Array<VacancyFormat> => isArray(value, (value): value is VacancyFormat => isEnumValueOf(VacancyFormat, value))) &&
        isOptional(data['scheduleTypes'], (value): value is Array<string> => isArray(value, isString)) &&
        isOptional(data['tags'], isString) &&
        isOptional(data['excludeWords'], isString) &&
        isOptional(data['education'], (value): value is Array<VacancyEducationType> => isArray(value, (value): value is VacancyEducationType => isEnumValueOf(VacancyEducationType, value))) &&
        isOptional(data['createdAt'], isNumber)
    );
};