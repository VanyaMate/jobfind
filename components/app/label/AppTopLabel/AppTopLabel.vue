<template>
    <label>
        <span>
            <slot name="label">Текст лейбла</slot>
        </span>
        <slot name="input"/>
    </label>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
label {
    display : block;

    > span {
        display        : inline-block;
        padding-bottom : var(--offset-small);
        font-size      : var(--font-size-m);
        color          : var(--color-invisible);
    }
}
</style>