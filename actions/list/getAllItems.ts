import type { Item } from '@prisma/client';


export const getAllItems = async function (page: number): Promise<Array<Item>> {
    return $fetch<Array<Item>>('/api/v1/list', { method: 'GET' });
};