<template>
    <div class="container">
        <input
            v-bind="$attrs"
            type="radio"
            :id="id"
            :class="['hidden', props.class]"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <label :for="id"></label>
    </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    modelValue?: boolean;
}

const id    = useId();
const props = defineProps<Props>();

defineOptions({
    inheritAttrs: true,
});
</script>

<style scoped>
.container {
    display : inline-block;

    input:checked {
        ~ label {
            border : 1px solid var(--primary-color);

            &:after {
                background : var(--primary-color);
            }
        }
    }

    input:focus-within,
    input:focus {
        ~ label {
            outline : 1px solid var(--primary-color);
        }
    }

    label {
        width           : var(--all-input-height-medium);
        height          : var(--all-input-height-medium);
        border          : 1px solid var(--border-color);
        background      : var(--bg-main);
        display         : inline-flex;
        align-items     : center;
        justify-content : center;
        border-radius   : 50%;
        cursor          : pointer;
        transition      : var(--fast);
        outline         : 1px solid transparent;

        &:after {
            content       : '';
            display       : inline-block;
            width         : calc(var(--all-input-height-medium) * .6);
            height        : calc(var(--all-input-height-medium) * .6);
            background    : var(--border-color);
            border-radius : 50%;
            transition    : var(--fast);
        }

        &:hover {
            background : var(--bg-second);
        }
    }
}
</style>