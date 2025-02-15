<template>
    <div class="header">
        <h1>
            <AppText :color="AppTextColor.RAINBOW" class="title">JobFind</AppText>
            <br/>
            <AppText :color="AppTextColor.MAIN" class="description">сервис по поиску работы</AppText>
        </h1>
        <div class="buttons">
            <AppButton :size="AppButtonSize.LARGE" :style-type="AppButtonStyleType.PRIMARY">Я ищу работу</AppButton>
            <AppText :color="AppTextColor.INVISIBLE">или</AppText>
            <AppButton :size="AppButtonSize.LARGE" :style-type="AppButtonStyleType.PRIMARY">Я даю работу</AppButton>
        </div>
    </div>
    <div class="jobs-list"></div>
</template>
<script setup lang="ts">
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import { userModel } from '~/model/user/user.model';
import { useCookieAsStore } from '~/hooks/useCookieAsStore';
import { useStore } from '@vanyamate/sec-vue';
import { createItemEffect, getAllItemsEffect, itemsStore } from '~/model/items/items.model';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


const user  = useCookieAsStore(userModel, 'user-data');
const items = useStore(itemsStore);
await getAllItemsEffect(1);

const data = useCookie('user-data');

const text    = ref('');
const pending = ref<boolean>(false);

const addListItem = function () {
    const value = text.value;

    if (value) {
        pending.value = true;
        createItemEffect(value)
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
</script>

<style scoped>
.header {
    padding        : 200px 0;
    display        : flex;
    flex-direction : column;
    gap            : 60px;

    h1 {
        text-align  : center;
        line-height : var(--font-size-l);

        .title {
            font-size : var(--font-size-xxxl);
        }

        .description {
            font-size   : var(--font-size-xl);
            font-weight : normal;
            color       : var(--color-second);
        }
    }

    .buttons {
        display         : flex;
        align-items     : center;
        justify-content : center;
        gap             : var(--offset-medium);
    }
}

.jobs-list {
    height        : 1000px;
    border-radius : var(--offset-medium);
    background    : var(--bg-second);
}
</style>