<template>
    <AppTabs :options="['Войти', 'Регистрация']" v-model="tab"/>
    <LoginForm v-if="tab === 'Войти'"/>
    <RegistrationForm v-else-if="tab === 'Регистрация'"/>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppTabs from '~/components/app/tabs/AppTabs/AppTabs.vue';
import LoginForm from '~/components/authorization/LoginForm/LoginForm.vue';
import RegistrationForm from '~/components/authorization/RegistrationForm/RegistrationForm.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();
const tab   = ref<'Войти' | 'Регистрация'>('Войти');

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>

</style>