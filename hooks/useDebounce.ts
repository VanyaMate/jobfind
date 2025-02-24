export const useDebounce = function (ms: number) {
    let timeout: number | null = null;

    return (callback: Function) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        timeout = setTimeout(callback, ms);
    };
};