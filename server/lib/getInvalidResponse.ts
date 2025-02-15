import { InvalidResponse } from '~/types/common/invalid-response';


export const getInvalidResponse = function (code: string): InvalidResponse {
    return { code };
};