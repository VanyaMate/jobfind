<template>
    <form v-bind="props">
        <slot/>
    </form>
</template>

<script lang="ts" setup>

import type { FormHTMLAttributes } from 'vue';


type Props = /* @vue-ignore */
    FormHTMLAttributes
    & {}

const props = defineProps<Props>();
</script>

<style scoped>
form {
    display        : flex;
    flex-direction : column;
    gap            : var(--offset-small);
}
</style>