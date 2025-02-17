<template>
    <main class="container">
        <nav>
            <NuxtLink to="/" class="logo">
                JF
            </NuxtLink>
            <div>
                <SwitchTheme/>
                <template v-if="user?.login">
                    <AppButton v-if="user?.login">
                        {{ user.login }}
                    </AppButton>
                    <AppButton :style-type="AppButtonStyleType.DANGER" @click="logoutEffect" :loading="authPending">
                        Выйти
                    </AppButton>
                </template>
                <AppModal v-else>
                    <template v-slot:trigger="{ open }">
                        <AppButton :style-type="AppButtonStyleType.DEFAULT" @click="open">Войти</AppButton>
                    </template>
                    <template v-slot:title>
                        <h3>Авторизация</h3>
                    </template>
                    <template v-slot:content>
                        <AuthorizationForm/>
                    </template>
                </AppModal>
            </div>
        </nav>
        <slot/>
    </main>
</template>

<script lang="ts" setup>
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import AuthorizationForm from '~/components/authorization/AuthorizationForm/AuthorizationForm.vue';
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import AppModal from '~/components/app/modal/AppModal/AppModal.vue';
import { useCookieAsStore } from '~/hooks/useCookieAsStore';
import { userModel, logoutEffect, authPendingModel } from '~/model/user/user.model';
import { useStore } from '@vanyamate/sec-vue';


const authPending = useStore(authPendingModel);
const user        = useCookieAsStore(userModel, 'user-data');
const theme       = useCookie('theme', {
    default () {
        return 'auto';
    },
});

useHead({
    bodyAttrs: {
        ['data-theme']: theme,
    },
});
</script>

<style scoped>
.container {
    > nav {
        position        : fixed;
        z-index         : 100;
        top             : var(--offset-large);
        left            : var(--offset-large);
        width           : calc(100dvw - var(--offset-large) * 2);
        max-width       : calc(100dvw - var(--offset-large) * 2);
        display         : flex;
        gap             : var(--offset-medium);
        justify-content : space-between;
        align-items     : center;
        padding         : var(--offset-medium);
        background      : color-mix(in srgb, var(--bg-main), transparent 60%);
        border-radius   : var(--offset-medium);

        .logo {
            padding    : var(--offset-small) var(--offset-medium);
            background : var(--bg-second);
        }

        a {
            font-size : var(--font-size-l);
        }

        > div {
            display     : flex;
            gap         : var(--offset-medium);
            align-items : center;
        }
    }
}
</style>