<template>
    <AppButton
        :loading="authPending"
        @click="logoutEffect"
        :style-type="AppButtonStyleType.DANGER"
    >
        Выйти
    </AppButton>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { authPendingModel, logoutEffect } from '~/model/user/user.model';
import { useStore } from '@vanyamate/sec-vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props       = defineProps<Props>();
const authPending = useStore(authPendingModel);

defineOptions({
    inheritAttrs: false,
});
</script>