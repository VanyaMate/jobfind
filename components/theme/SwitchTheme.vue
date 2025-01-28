<template>
    <select v-model="themeRef">
        <option value="auto">Auto</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
    </select>
</template>

<script lang="ts" setup>
import cookie from 'js-cookie';
import { watch } from 'vue';


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