<template>
    <div class="container">
        <input
            v-bind="$attrs"
            type="checkbox"
            :id="id"
            :checked="props.modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <label :for="id"></label>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    modelValue?: boolean;
}

const props = defineProps<Props>();
const id    = Math.random().toString(16);

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.container {
    position : relative;
    display  : inline-block;
    height   : var(--all-input-height-medium);

    input {
        opacity : 0;
        width   : 0;
        height  : 0;
        border  : none;
        outline : none;
    }

    label {
        width           : var(--all-input-height-medium);
        height          : var(--all-input-height-medium);
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
            ~ label {
                border     : 1px solid var(--primary-color);
                background : var(--bg-second);
                outline    : 1px solid var(--primary-color);
            }
        }

        &:not(:checked) {
            ~ label {
                border     : 1px solid var(--border-color);
                background : var(--bg-second);
                outline    : 1px solid var(--border-color);
            }
        }
    }

    input:checked ~ label {
        &:after {
            content : '✓';
        }

        border     : 1px solid var(--primary-color);
        background : var(--bg-second);
        color      : var(--color-main);
    }
}
</style>