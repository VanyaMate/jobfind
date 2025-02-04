export const emailValidator = function (email: string): true | string {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return true;
    }

    return 'Некорректная почта';
};