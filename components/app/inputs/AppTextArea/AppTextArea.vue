<template>
    <div :class="['app-textarea-container', { readonly, disabled }]" :style="containerStyles">
        <textarea
            ref="textareaRef"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            v-bind="textareaAttrs"
            :readonly="readonly"
            :disabled="disabled"
            :placeholder="placeholder"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @change="$emit('change', $event)"
            @click="$emit('click', $event)"
            @keydown="$emit('keydown', $event)"
            @keyup="$emit('keyup', $event)"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    modelValue: string;
    readonly?: boolean;
    disabled?: boolean;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    rows?: number;
    cols?: number;
}

interface Emits {
    (e: 'update:modelValue', value: string): void;

    (e: 'change', value: Event): void;

    (e: 'click', value: Event): void;

    (e: 'keydown', value: Event): void;

    (e: 'keyup', value: Event): void;
}

const emit            = defineEmits<Emits>();
const props           = withDefaults(defineProps<Props>(), {
    modelValue : '',
    readonly   : false,
    disabled   : false,
    placeholder: '',
    minRows    : 1,
    maxRows    : 10,
    rows       : 4,
    cols       : 20,
});
const isFocused       = ref<boolean>(false);
const textareaRef     = ref<HTMLTextAreaElement | null>(null);
const textareaAttrs   = computed(() => {
    return {
        ...props,
        class: [
            {
                focused: isFocused.value,
            },
        ],
    };
});
const containerStyles = computed(() => {
    return {
        '--rows': props.rows,
        '--cols': props.cols,
    };
});
defineExpose({
    textarea: textareaRef,
    focus () {
        nextTick(() => {
            textareaRef.value?.focus();
        });
    },
    blur () {
        nextTick(() => {
            textareaRef.value?.blur();
        });
    },
    select () {
        nextTick(() => {
            textareaRef.value?.select();
        });
    },
});

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.app-textarea-container {
    position  : relative;
    display   : inline-block;
    width     : 100%;
    max-width : 100%;
    min-width : 0;

    &.disabled {
        opacity : .6;
        cursor  : not-allowed;
    }

    &.readonly {
        pointer-events : none;
        background     : var(--bg-second);
    }

    > textarea {
        transition    : var(--fast);
        width         : 100%;
        height        : fit-content;
        min-height    : calc(var(--all-input-height-large) * 3);
        resize        : vertical;
        font-size     : var(--font-size-m);
        padding       : var(--offset-medium);
        border        : 1px solid var(--border-color);
        border-radius : var(--offset-small);
        background    : var(--bg-main);
        color         : var(--color-main);
        box-shadow    : none;
        outline       : 1px solid transparent;

        &.focused {
            border-color : var(--primary-color);
            outline      : 1px solid var(--primary-color);
        }
    }
}
</style>