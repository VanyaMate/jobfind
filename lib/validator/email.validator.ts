export const emailValidator = function (email: string) {
    console.log('Email validator', email);

    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return true;
    }

    return 'Некорректная почта';
};