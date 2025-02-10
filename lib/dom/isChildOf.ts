export const isChildOf = function (target: HTMLElement | null, parent: HTMLElement): boolean {
    if (target === parent) {
        return true;
    }

    if (target === null) {
        return false;
    }

    return isChildOf(target.parentElement, parent);
};