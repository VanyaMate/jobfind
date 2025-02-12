<template>
    <form v-bind="props">
        <slot/>
    </form>
</template>

<script lang="ts" setup>

import type { FormHTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */FormHTMLAttributes {
}

const props = defineProps<Props>();
</script>

<style scoped>
form {
    display        : flex;
    flex-direction : column;
    gap            : var(--offset-medium);
}
</style>