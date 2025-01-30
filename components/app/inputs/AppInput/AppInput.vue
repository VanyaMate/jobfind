<template>
    <input
        v-bind="props"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';


type Props = /* @vue-ignore */
    InputHTMLAttributes
    & {}

const props = defineProps<Props>();
defineEmits([ 'update:modelValue' ]);

</script>

<style scoped>
input {
    background    : var(--bg-main);
    border        : 1px solid var(--border-color);
    border-radius : var(--offset-small);
    padding       : var(--offset-small);
    outline       : none;
    transition    : box-shadow, border var(--fast);
    color         : var(--color-main);
    height        : 30px;

    &:focus {
        border     : 1px solid var(--primary-color);
        box-shadow : 0 0 15px -5px var(--primary-color);
    }
}
</style>