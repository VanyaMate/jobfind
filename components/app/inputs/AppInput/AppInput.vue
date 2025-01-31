<template>
    <input
        :class="props.size"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { AppInputSize } from '~/components/app/inputs/AppInput/types/AppInputSize';


interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    size?: AppInputSize;
}

const props = withDefaults(
    defineProps<Props>(),
    {
        size: AppInputSize.MEDIUM,
    },
);

</script>

<style scoped>
input {
    background    : var(--bg-main);
    border        : 1px solid var(--border-color);
    border-radius : var(--offset-small);
    outline       : none;
    transition    : box-shadow, border var(--fast);
    color         : var(--color-main);
    height        : var(--all-input-height-medium);

    &.small {
        font-size : var(--font-size-s);
        padding   : 0 var(--offset-small);
        height    : var(--all-input-height-small);
    }

    &.medium {
        font-size : var(--font-size-m);
        padding   : 0 var(--offset-small);
        height    : var(--all-input-height-medium);
    }

    &.large {
        font-size : var(--font-size-l);
        padding   : 0 var(--offset-medium);
        height    : var(--all-input-height-large);
    }

    &:focus {
        border     : 1px solid var(--primary-color);
        box-shadow : 0 0 15px -5px var(--primary-color);
    }
}
</style>