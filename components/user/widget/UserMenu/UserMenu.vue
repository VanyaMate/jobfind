<template>
    <div class="userMenu-container">
        <NuxtLink to="/profile">Мой профиль</NuxtLink>
        <NuxtLink to="/resume">Мои резюме</NuxtLink>
        <NuxtLink to="/company">Мои компании</NuxtLink>
        <UserLogoutButton/>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { User } from '~/types/user/user';
import UserLogoutButton from '~/components/user/feature/UserLogoutButton/UserLogoutButton.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    user: User;
}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.userMenu-container {
    display        : flex;
    flex-direction : column;
    gap            : var(--offset-small);
    width          : 300px;
}
</style>