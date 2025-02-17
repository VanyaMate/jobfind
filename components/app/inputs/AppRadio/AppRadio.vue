<template>
    <div class="container">
        <input
            v-bind="$attrs"
            type="radio"
            :id="id"
            :class="['hidden', props.class]"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <label class="icon" :for="id"></label>
        <label class="text" :for="id" v-if="$slots['default']">
            <slot/>
        </label>
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
    display     : inline-flex;
    gap         : var(--offset-small);
    align-items : center;

    input {
        position : absolute;
    }

    input:checked {
        ~ .icon {
            border : 1px solid var(--primary-color);

            &:after {
                background : var(--primary-color);
            }
        }

        ~ .text {
            color : var(--color-main);
        }
    }

    input:focus-within,
    input:focus {
        ~ .icon {
            outline : 1px solid var(--primary-color);
        }

        ~ .text {
            color : var(--color-second);
        }
    }

    .icon {
        width           : var(--all-input-height-small);
        height          : var(--all-input-height-small);
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
            width         : calc(var(--all-input-height-small) * .6);
            height        : calc(var(--all-input-height-small) * .6);
            background    : var(--border-color);
            border-radius : 50%;
            transition    : var(--fast);
        }

        &:hover {
            background : var(--bg-second);
        }
    }

    .text {
        color : var(--color-invisible);

        &:hover {
            color : var(--color-second);
        }
    }
}
</style>