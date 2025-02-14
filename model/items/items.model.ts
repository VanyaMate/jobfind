import { store, effect } from '@vanyamate/sec-vue';
import type { Item } from '@prisma/client';
import { getAllItems } from '~/actions/list/getAllItems';
import { createItem } from '~/actions/list/createItem';


export const getAllItemsEffect = effect(getAllItems);
export const createItemEffect  = effect(createItem);

export const itemsStore = store<Array<Item>>([])
    .on(getAllItemsEffect, 'onSuccess', (state, { result }) => {
        state.value = result!;
    })
    .on(createItemEffect, 'onSuccess', (state, { result }) => {
        state.value.push(result!);
    });