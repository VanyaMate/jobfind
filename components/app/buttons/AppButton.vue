<template>
    <button :class="[props.styleType, props.size, { quad: props.quad }]">
        <slot/>
    </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';


interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    styleType?: AppButtonStyleType;
    size?: AppButtonSize;
    quad?: boolean;
};

const props = withDefaults(
    defineProps<Props>(),
    {
        styleType: AppButtonStyleType.DEFAULT,
        size     : AppButtonSize.MEDIUM,
        quad     : false,
    },
);

</script>

<style scoped>
button {
    min-height    : var(--all-input-height);
    padding       : var(--offset-small);
    border-radius : var(--offset-small);
    cursor        : pointer;

    &.small {
        min-height : calc(var(--all-input-height) * .7);
        font-size  : var(--font-size-s);
    }

    &.medium {
        min-height : var(--all-input-height);
        font-size  : var(--font-size-m);
    }

    &.large {
        min-height : calc(var(--all-input-height) * 1.3);
        font-size  : var(--font-size-l);
    }

    &.quad {
        height     : var(--all-input-height);
        width      : var(--all-input-height);
        overflow   : hidden;
        text-align : center;
        padding    : 0;
    }

    &.default {
        border     : 1px solid var(--border-color);
        background : var(--bg-main);
        color      : var(--color-main);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--bg-second), var(--mix-dark) 20%);
        }

        &:active {
            background : color-mix(in srgb, var(--bg-second), var(--mix-dark) 60%);
        }
    }

    &.secondary {
        border     : 1px solid var(--border-color);
        background : var(--bg-second);
        color      : var(--color-second);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--bg-second), var(--mix-dark) 30%);
        }

        &:active {
            background : color-mix(in srgb, var(--bg-second), var(--mix-dark) 60%);
        }
    }

    &.primary {
        border     : 1px solid var(--primary-color);
        background : var(--primary-color);
        color      : var(--primary-color-inv);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--primary-color), var(--mix-dark) 20%);
        }

        &:active {
            background : color-mix(in srgb, var(--primary-color), var(--mix-dark) 30%);
        }
    }

    &.danger {
        border     : 1px solid var(--danger-color);
        background : var(--danger-color);
        color      : var(--danger-color-inv);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--danger-color), var(--mix-dark) 20%);
        }

        &:active {
            background : color-mix(in srgb, var(--danger-color), var(--mix-dark) 30%);
        }
    }

    &.warning {
        border     : 1px solid var(--warning-color);
        background : var(--warning-color);
        color      : var(--warning-color-inv);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--warning-color), var(--mix-light) 20%);
        }

        &:active {
            background : color-mix(in srgb, var(--warning-color), var(--mix-light) 30%);
        }
    }

    &.invisible {
        border     : 1px solid transparent;
        background : transparent;
        color      : var(--color-main);

        &:hover,
        &:focus {
            background : color-mix(in srgb, transparent, var(--bg-second) 50%);
        }

        &:active {
            background : color-mix(in srgb, transparent, var(--bg-second) 30%);
        }
    }
}
</style>

