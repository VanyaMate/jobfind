export const getUnselectedEnum = function (targetEnum: object, selectedKeys: Array<string>) {
    return Object.values(targetEnum).filter((value) => !selectedKeys.includes(value));
};

export const getUnselectedArray = function (targetArray: Array<any>, selectedItems: Array<any>) {
    return targetArray.filter((item) => !selectedItems.includes(item));
};