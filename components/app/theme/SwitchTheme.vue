<template>
    <AppSelect
        v-model="themeRef"
        :options="[
            { value: 'auto', label: 'Авто' },
            { value: 'dark', label: 'Тьма' },
            { value: 'light', label: 'Свет' },
        ]"
    />
</template>

<script lang="ts" setup>
import cookie from 'js-cookie';
import { watch } from 'vue';
import AppSelect from '~/components/app/select/AppSelect/AppSelect.vue';


const theme = useCookie('theme', {
    default () {
        return 'auto';
    },
});

const themeRef = ref(theme);

watch(themeRef, (value) => {
    setTheme(value);
});

const setTheme = (theme: string) => {
    cookie.set('theme', theme);
    document.body.setAttribute('data-theme', theme);
};
</script>