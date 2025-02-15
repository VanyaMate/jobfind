<template>
    <span :class="['short-preview-container', { primary: props.primary }]">
        <img :src="props.avatar" :alt="props.title" loading="lazy"/>
        <span>{{ props.title }}</span>
    </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    title: string;
    avatar: string;
    primary?: boolean;
}

const props = withDefaults(
    defineProps<Props>(),
    {
        title  : '',
        avatar : '',
        primary: (state) => {
            return state.primary ?? false;
        },
    },
);

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.short-preview-container {
    display     : inline-flex;
    gap         : var(--offset-small);
    align-items : center;

    &.primary {
        > img {
            width  : var(--all-input-height-medium);
            height : var(--all-input-height-medium);
        }
    }

    > img {
        width         : var(--all-input-height-small);
        height        : var(--all-input-height-small);
        border-radius : 50%;
    }

    > span {
        display : inline-block;
        height  : 100%;
    }
}
</style>