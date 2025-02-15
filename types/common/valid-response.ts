import {
    type TypeGuard,
    isObject,
    isUndefined,
} from '@vanyamate/types-kit';


export type ValidResponse = {
    data: unknown;
}

export const isValidResponse: TypeGuard<ValidResponse> = function (data): data is ValidResponse {
    return (
        isObject(data) &&
        !isUndefined(data['data'])
    );
};