import { MultiPartData } from 'h3';


export const getFieldFormData = function (formData: Array<MultiPartData>, fieldName: string): MultiPartData | undefined {
    return formData.find((field) => field.name === fieldName);
};

export const getStringFieldFormData = function (formData: Array<MultiPartData>, fieldName: string): string | undefined {
    return getFieldFormData(formData, fieldName)?.data.toString();
};