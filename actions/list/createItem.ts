import type { Item } from '@prisma/client';


export const createItem = async function (text: string): Promise<Item> {
    return $fetch<Item>('/api/v1/list', {
        method: 'POST', body: text, headers: { 'Content-Type': 'text/plain' },
    });
};