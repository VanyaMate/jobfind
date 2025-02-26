<template>
    <AppDropdown
        :text="props.user.login"
        modal-position="bottom-right"
    >
        <UserMenu :user="props.user"/>
    </AppDropdown>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppDropdown from '~/components/app/dropdown/AppDropdown/AppDropdown.vue';
import type { User } from '~/types/user/user';
import UserMenu from '~/components/user/widget/UserMenu/UserMenu.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    user: User;
}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.openUserMenuButton-container {

}
</style>