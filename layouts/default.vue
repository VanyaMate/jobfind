<template>
    <main class="container">
        <nav>
            <NuxtLink to="/" class="logo">
                JF
            </NuxtLink>
            <div>
                <SwitchTheme/>
                <template v-if="user?.login">
                    <OpenUserMenuButton :user="user"/>
                </template>
                <template v-else>
                    <AppModal>
                        <template v-slot:trigger="{ open }">
                            <AppButton :style-type="AppButtonStyleType.SECONDARY" @click="open">Войти
                            </AppButton>
                        </template>
                        <template v-slot:title>
                            <h3>Авторизация</h3>
                        </template>
                        <template v-slot:content>
                            <AuthorizationForm/>
                        </template>
                    </AppModal>
                </template>
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
import { userModel } from '~/model/user/user.model';
import OpenUserMenuButton from '~/components/user/widget/OpenUserMenuButton/OpenUserMenuButton.vue';


const user  = useCookieAsStore(userModel, 'user-data');
const theme = useCookie('theme', {
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
    display        : flex;
    flex-direction : column;
    gap            : var(--offset-medium);

    > nav {
        z-index         : 100;
        width           : 100%;
        display         : flex;
        gap             : var(--offset-medium);
        justify-content : space-between;
        align-items     : center;
        height          : var(--all-input-height-medium);

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