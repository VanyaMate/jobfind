import {
    type TypeGuard,
    isObject,
    isString,
} from '@vanyamate/types-kit';
import type { Company } from '~/types/company/company';
import type { CompanyBranch } from '~/types/company-branch/company-branch';
import { isCompany } from '~/types/company/company';
import { isCompanyBranch } from '~/types/company-branch/company-branch';


export type Job = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    company: Company;
    branch: CompanyBranch;
}

export const isJob: TypeGuard<Job> = function (data): data is Job {
    return (
        isObject(data) &&
        isString(data['id']) &&
        isString(data['title']) &&
        isString(data['description']) &&
        isString(data['createdAt']) &&
        isCompany(data['company']) &&
        isCompanyBranch(data['branch'])
    );
};