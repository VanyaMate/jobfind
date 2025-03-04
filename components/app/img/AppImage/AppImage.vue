<template>
    <img
        class="appImage-container"
        v-bind="$attrs"
        :src="props.src"
        :alt="props.alt"
        :loading="props.loading"
    />
</template>

<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ ImgHTMLAttributes {
    src: string;
    alt?: string;
    loading?: 'lazy' | 'eager';
}

const props = withDefaults(defineProps<Props>(), {
    src    : '',
    alt    : 'Описание не указано',
    loading: 'lazy',
});

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.appImage-container {
    border-radius : var(--offset-medium);
    border        : 1px solid var(--border-color);
}
</style>