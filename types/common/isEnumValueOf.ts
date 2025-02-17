export const isEnumValueOf = function <T extends object> (object: T, value: unknown): value is T {
    return Object.values(object).includes(value as T);
};