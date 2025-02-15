import {
    type TypeGuard,
    isObject,
    isString,
} from '@vanyamate/types-kit';


export type InvalidResponse = {
    code: string;
}

export const isInvalidResponse: TypeGuard<InvalidResponse> = function (data): data is InvalidResponse {
    return (
        isObject(data) &&
        isString(data['code'])
    );
};