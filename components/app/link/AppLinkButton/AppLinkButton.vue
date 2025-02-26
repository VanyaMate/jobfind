<template>
    <NuxtLink v-bind="$attrs" class="appLinkButton-container">
        <slot/>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from '#app';


interface Props extends /* @vue-ignore */ NuxtLinkProps {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.appLinkButton-container {
    background      : var(--bg-main);
    border          : 1px solid var(--border-color);
    display         : flex;
    align-items     : center;
    justify-content : center;
    height          : var(--all-input-height-medium);
    border-radius   : var(--offset-small);
    color           : var(--color-main);
    text-decoration : none;

    &:hover {
        background : var(--bg-second);
    }
}
</style>