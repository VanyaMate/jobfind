<template>
    <div class="userMenu-container">
        <AppLinkButton to="/my/profile">Мой профиль</AppLinkButton>
        <AppLinkButton to="/my/resume">Мои резюме</AppLinkButton>
        <AppLinkButton to="/my/company">Мои компании</AppLinkButton>
        <AppDivider/>
        <UserLogoutButton/>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { User } from '~/types/user/user';
import UserLogoutButton from '~/components/user/feature/UserLogoutButton/UserLogoutButton.vue';
import AppLinkButton from '~/components/app/link/AppLinkButton/AppLinkButton.vue';
import AppDivider from '~/components/app/divider/AppDivider/AppDivider.vue';


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