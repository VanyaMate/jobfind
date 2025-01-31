<template>
    <div class="container">
        <input
            :class="[props.size, { error: hasError }]"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @change="$emit('change', $event)"
            @blur="$emit('blur', $event)"
            v-bind="$attrs"
            :value="props.modelValue"
        />
        <div class="errorMarker">?</div>
        <div class="errorMessage">{{ errorMessage }}</div>
    </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes } from 'vue';
import { AppInputSize } from '~/components/app/inputs/AppInput/types/AppInputSize';


interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    size?: AppInputSize;
    error?: string;
    modelValue?: string;
}

const props = withDefaults(
    defineProps<Props>(),
    {
        size      : AppInputSize.MEDIUM,
        error     : undefined,
        modelValue: '',
    },
);

console.log('attrs', useAttrs());
console.log('props', props);

const hasError     = computed(() => props.error && props.error.length);
const errorMessage = ref(props.error);

watchEffect(() => {
    if (props.error) {
        errorMessage.value = props.error;
    }
});

defineOptions({
    inheritAttrs: false,
});

</script>

<style scoped>
.container {
    position : relative;

    .errorMarker {
        position        : absolute;
        right           : 2px;
        top             : 2px;
        border-radius   : 50% var(--offset-small) var(--offset-small) 50%;
        background      : var(--danger-color);
        color           : var(--danger-color-inv);
        display         : flex;
        align-items     : center;
        justify-content : center;
        user-select     : none;
        cursor          : default;
        visibility      : hidden;
        opacity         : 0;
        transition      : var(--fast);

        &:hover ~ .errorMessage {
            visibility : visible;
            opacity    : 1;
        }
    }

    .errorMessage {
        position      : absolute;
        bottom        : calc(100% + var(--offset-small));
        right         : 0;
        visibility    : hidden;
        opacity       : 0;
        transition    : var(--fast);
        background    : var(--danger-color);
        color         : var(--danger-color-inv);
        padding       : var(--offset-small);
        border-radius : var(--offset-small);
    }

    input {
        background    : var(--bg-main);
        border        : 1px solid var(--border-color);
        border-radius : var(--offset-small);
        outline       : none;
        transition    : box-shadow, border var(--fast);
        color         : var(--color-main);
        height        : var(--all-input-height-medium);
        width         : 100%;

        &.error {
            border : 1px solid var(--danger-color);

            &:focus {
                outline    : 1px solid var(--danger-color);
                box-shadow : 0 0 15px -5px var(--danger-color);

                ~ .errorMessage {
                    visibility : visible;
                    opacity    : 1;
                }
            }

            ~ .errorMarker {
                visibility : visible;
                opacity    : 1;
            }
        }

        &.small {
            font-size : var(--font-size-s);
            padding   : 0 var(--offset-small);
            height    : var(--all-input-height-small);

            ~ .errorMarker {
                width  : calc(var(--all-input-height-small) - 4px);
                height : calc(var(--all-input-height-small) - 4px);
            }
        }

        &.medium {
            font-size : var(--font-size-m);
            padding   : 0 var(--offset-small);
            height    : var(--all-input-height-medium);

            ~ .errorMarker {
                width  : calc(var(--all-input-height-medium) - 4px);
                height : calc(var(--all-input-height-medium) - 4px);
            }
        }

        &.large {
            font-size : var(--font-size-l);
            padding   : 0 var(--offset-medium);
            height    : var(--all-input-height-large);

            ~ .errorMarker {
                width  : calc(var(--all-input-height-large) - 4px);
                height : calc(var(--all-input-height-large) - 4px);
            }
        }

        &:focus:not(.error) {
            border     : 1px solid var(--primary-color);
            outline    : 1px solid var(--primary-color);
            box-shadow : 0 0 15px -5px var(--primary-color);
        }

        &:valid:not(.error) {
            border : 1px solid var(--primary-color);
        }
    }
}
</style>