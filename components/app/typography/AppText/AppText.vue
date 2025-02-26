<template>
    <span :class="props.color ?? 'main'">
        <slot/>
    </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    color?: AppTextColor;
}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: true,
});
</script>

<style scoped>
span {
    font-size : inherit;

    &.main {
        color : var(--color-main);
    }

    &.second {
        color : var(--color-second);
    }

    &.invisible {
        color : var(--color-invisible);
    }

    &.primary {
        color : var(--primary-color);
    }

    &.danger {
        color : var(--danger-color);
    }

    &.warning {
        color : var(--warning-color);
    }

    &.rainbow {
        background      : var(--rainbow);
        background-size : 200%;
        background-clip : text;
        color           : transparent;
    }
}
</style>