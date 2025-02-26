<template>
    <div :class="['appTag-container', props.styleType]">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AppTagType } from '~/components/app/tag/AppTag/types/AppTagType';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    styleType?: AppTagType;
}

const props = withDefaults(
    defineProps<Props>(),
    {
        styleType: AppTagType.MAIN,
    },
);
defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.appTag-container {
    display       : inline-flex;
    padding       : var(--offset-small);
    font-size     : var(--font-size-s);
    border-radius : var(--offset-small);

    &.main {
        background : var(--bg-main);
        border     : 1px solid var(--border-color);
        color      : var(--color-main);
    }

    &.second {
        background : var(--bg-second);
        border     : 1px solid var(--border-color);
        color      : var(--color-second);
    }

    &.primary {
        background : color-mix(in srgb, var(--primary-color), var(--bg-main) 30%);
        border     : 1px solid color-mix(in srgb, var(--primary-color), var(--bg-main) 10%);
        color      : var(--primary-color-inv);
    }

    &.danger {
        background : color-mix(in srgb, var(--danger-color), var(--bg-main) 30%);
        border     : 1px solid color-mix(in srgb, var(--danger-color), var(--bg-main) 10%);
        color      : var(--danger-color-inv);
    }

    &.warning {
        background : color-mix(in srgb, var(--warning-color), var(--bg-main) 30%);
        border     : 1px solid color-mix(in srgb, var(--warning-color), var(--bg-main) 10%);
        color      : var(--warning-color-inv);
    }

    &.invisible {
        background : color-mix(in srgb, var(--bg-main), var(--bg-main) 30%);
        border     : 1px solid var(--border-color);
        color      : var(--color-invisible);
    }

    &.rainbow {
        background : var(--rainbow);
        border     : 1px solid var(--primary-color);
        color      : var(--primary-color-inv);
    }
}
</style>