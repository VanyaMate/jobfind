<template>
    <div class="container">
        <input
            v-bind="$attrs"
            :class="['hidden', props.class]"
            type="checkbox"
            :id="id"
            :checked="props.modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <label class="icon" :for="id"></label>
        <label class="text" :for="id" v-if="$slots['default']">
            <slot/>
        </label>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    modelValue?: boolean;
}

const props = defineProps<Props>();
const id    = useId();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.container {
    display     : inline-flex;
    align-items : center;
    gap         : var(--offset-small);
    height      : var(--all-input-height-small);

    input {
        position : absolute;
    }

    .icon {
        width           : var(--all-input-height-small);
        height          : var(--all-input-height-small);
        background      : var(--bg-main);
        border          : 1px solid var(--border-color);
        border-radius   : var(--offset-small);
        display         : inline-flex;
        align-items     : center;
        justify-content : center;
        color           : var(--color-invisible);
        cursor          : pointer;
        outline         : 1px solid transparent;
        transition      : var(--fast);

        &:after {
            content : 'X';
        }
    }

    input:focus-within,
    input:focus {
        &:checked {
            ~ .icon {
                border  : 1px solid var(--primary-color);
                outline : 1px solid var(--primary-color);
            }

            ~ .text {
                color : var(--color-second);
            }
        }

        &:not(:checked) {
            ~ .icon {
                border     : 1px solid var(--border-color);
                background : var(--bg-second);
                outline    : 1px solid var(--border-color);
            }

            ~ .text {
                color : var(--color-second);
            }
        }
    }

    input:checked {
        ~ .icon {
            &:after {
                content : '✓';
            }

            border     : 1px solid var(--primary-color);
            background : var(--bg-main);
            color      : var(--primary-color);
        }

        ~ .text {
            color : var(--color-main);
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