<template>
    <button :class="[props.styleType, props.size, { loading: props.loading }, { quad: props.quad }]">
        <slot v-if="!(quad && loading)"/>
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
    loading?: boolean;
};

const props = withDefaults(
    defineProps<Props>(),
    {
        styleType: AppButtonStyleType.DEFAULT,
        size     : AppButtonSize.MEDIUM,
        quad     : false,
        loading  : false,
    },
);

</script>

<style scoped>
@keyframes rotate360 {
    0% {
        transform : rotate(0deg);
    }
    100% {
        transform : rotate(360deg);
    }
}

button {
    min-height      : var(--all-input-height-medium);
    height          : var(--all-input-height-medium);
    padding         : 0 var(--offset-small);
    border-radius   : var(--offset-small);
    cursor          : pointer;
    transition      : var(--fast);
    display         : flex;
    align-items     : center;
    justify-content : center;
    outline         : 1px solid transparent;

    &:after {
        content       : '';
        border-radius : 50%;
        width         : 0;
        border        : 2px solid transparent;
        transition    : width, margin-left var(--fast);
        overflow      : hidden;
    }

    &.loading {
        &.small {
            &:after {
                width  : calc(var(--all-input-height-small) * .5);
                height : calc(var(--all-input-height-small) * .5);
            }
        }

        &.medium {
            &:after {
                width  : calc(var(--all-input-height-medium) * .5);
                height : calc(var(--all-input-height-medium) * .5);
            }
        }


        &.large {
            &:after {
                width  : calc(var(--all-input-height-large) * .5);
                height : calc(var(--all-input-height-large) * .5);
            }
        }

        &:after {
            border-left : 2px solid var(--border-color);
            animation   : rotate360 var(--slow) infinite ease-in-out;
        }
    }

    &.loading:not(.quad) {
        &:after {
            margin-left : var(--offset-medium);
        }
    }

    &.small {
        min-height : var(--all-input-height-small);
        height     : var(--all-input-height-small);
        font-size  : var(--font-size-s);
    }

    &.medium {
        min-height : var(--all-input-height-medium);
        height     : var(--all-input-height-medium);
        font-size  : var(--font-size-m);
    }

    &.large {
        min-height    : var(--all-input-height-large);
        height        : var(--all-input-height-large);
        font-size     : var(--font-size-l);
        border-radius : var(--offset-small);
    }

    &.quad {
        overflow   : hidden;
        text-align : center;
        padding    : 0;

        &.small {
            width : var(--all-input-height-small);
        }

        &.medium {
            width : var(--all-input-height-medium);
        }

        &.large {
            width : var(--all-input-height-large);
        }
    }

    &.default {
        border     : 1px solid var(--border-color);
        background : var(--bg-main);
        color      : var(--color-main);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--bg-second), var(--bg-main) 20%);
        }

        &:focus {
            outline : 1px solid var(--border-color);
        }

        &:active {
            background : color-mix(in srgb, var(--bg-second), var(--bg-main) 40%);
        }
    }

    &.secondary {
        border     : 1px solid var(--border-color);
        background : var(--bg-second);
        color      : var(--color-second);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--bg-second), var(--bg-main) 20%);
        }

        &:focus {
            outline : 1px solid var(--border-color);
        }

        &:active {
            background : color-mix(in srgb, var(--bg-second), var(--bg-main) 40%);
        }
    }

    &.primary {
        border     : 1px solid var(--primary-color);
        background : var(--primary-color);
        color      : var(--primary-color-inv);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--primary-color), var(--bg-main) 10%);
        }

        &:focus {
            outline : 1px solid var(--primary-color);
        }

        &:active {
            background : color-mix(in srgb, var(--primary-color), var(--bg-main) 20%);
        }
    }

    &.danger {
        border     : 1px solid var(--danger-color);
        background : var(--danger-color);
        color      : var(--danger-color-inv);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--danger-color), var(--bg-main) 10%);
        }

        &:focus {
            outline : 1px solid var(--danger-color);
        }

        &:active {
            background : color-mix(in srgb, var(--danger-color), var(--bg-main) 20%);
        }
    }

    &.warning {
        border     : 1px solid var(--warning-color);
        background : var(--warning-color);
        color      : var(--warning-color-inv);

        &:hover,
        &:focus {
            background : color-mix(in srgb, var(--warning-color), var(--bg-main) 10%);
        }

        &:focus {
            outline : 1px solid var(--warning-color);
        }

        &:active {
            background : color-mix(in srgb, var(--warning-color), var(--bg-main) 20%);
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

        &:focus {
            outline : 1px solid var(--border-color);
        }

        &:active {
            background : color-mix(in srgb, transparent, var(--bg-second) 30%);
        }
    }
}
</style>

