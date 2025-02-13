<template>
    <h1>
        <AppText :color="AppTextColor.RAINBOW">Authorized like: %login%</AppText>
    </h1>
    <AppButton :style-type="AppButtonStyleType.DANGER" @click="logout">Logout</AppButton>
</template>
<script setup lang="ts">
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


const logout = function () {
    fetch('/api/auth/logout', {
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