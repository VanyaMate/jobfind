<template>
    <h1 @click="() => updateLoginEffect(user?.login ?? cookie?.login)">
        <AppText :color="AppTextColor.RAINBOW">Application page {{ user?.login ?? cookie?.login }}</AppText>
    </h1>
    <ul>
        <li v-for="item in users" :key="item.id">
            <AppText :color="AppTextColor.INVISIBLE">
                {{ item.createData }}
            </AppText>
            <AppText :color="AppTextColor.MAIN">
                {{ item.text }}
            </AppText>
        </li>
    </ul>

    <AppTopLabel>
        <template v-slot:label>
            Текст
        </template>
        <template v-slot:input>
            <AppInput placeholder="Введите текст" v-model="text"/>
        </template>
    </AppTopLabel>
    <AppButton :style-type="AppButtonStyleType.PRIMARY" @click="addListItem" :loading="pending">Добавить</AppButton>

    <AppButton :style-type="AppButtonStyleType.DANGER" @click="logout">Выйти</AppButton>
</template>
<script setup lang="ts">
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import type { Item } from '@prisma/client';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import { updateLoginEffect, userModel } from '~/model/user/user.model';


const cookie          = useCookie('user-data');
const user            = userModel.get();
const { data: users } = await useFetch<Array<Item>>('/api/v1/list');

const text    = ref('');
const pending = ref<boolean>(false);

const addListItem = function () {
    const value = text.value;

    if (value) {
        pending.value = true;
        fetch('/api/v1/list', {
            method: 'POST',
            body  : value,
        })
            .then((response) => response.json())
            .then((data) => users.value?.push(data))
            .then(() => text.value = '')
            .finally(() => pending.value = false);

    }
};

const logout = function () {
    fetch('/api/v1/auth/logout', {
        method: 'POST',
    })
        .then((response) => {
            if (response.ok) {
                navigateTo('/login');
            }
        });
};

definePageMeta({
    middleware: [ 'auth' ],
});
</script>