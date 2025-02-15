import { randomUUID } from 'node:crypto';


export const getLoginByEmail = function (email: string) {
    return email.split('@')[0] + '-' + randomUUID().slice(0, 6);
};