<template>
    <div
        :class="['container', { opened: isOpen }]"
        role="combobox"
        :aria-expanded="isOpen"
        tabindex="0"
        @keydown.down.prevent="() => navigate(1)"
        @keydown.up.prevent="() => navigate(-1)"
        @keydown.enter.prevent="() => selectOption(options[hoveredIndex])"
        @keydown.esc="close"
        @keydown.space.prevent="open"
        @keydown.tab="smartClose"
        @blur="close"
    >
        <div
            ref="parent"
            class="label"
            @click="toggleDropdown"
        >
            <span :class="['text', { empty: !selectedLabel }]">
                {{ selectedLabel || 'Не выбрано' }}
            </span>
            <svg width="10px" height="7px">
                <line x1="0" y1="0" x2="5" y2="6"/>
                <line x1="5" y1="6" x2="10" y2="0"/>
            </svg>
        </div>
        <ul
            :class="[
                'modal',
                { inverse: modalPosition.top === 'auto' },
                { fullscreen: !modalPosition.maxWidth || !modalPosition.maxHeight },
                { preopened: preopen },
                { wrap: isOpen && modalPosition.left === 0 && modalPosition.right === 0 }
            ]"
            role="listbox"
            ref="modal"
            :style="{
                top: getElementOffset(modalPosition.top),
                left: getElementOffset(modalPosition.left),
                right: getElementOffset(modalPosition.right),
                bottom: getElementOffset(modalPosition.bottom),
                maxWidth: getElementSize(modalPosition.maxWidth),
                maxHeight: getElementSize(modalPosition.maxHeight),
            }"
        >
            <li
                v-for="(option, index) in props.options"
                :key="index"
                :aria-selected="props.modelValue === option.value"
                :class="{
                    active: hoveredIndex === index,
                    selected: props.modelValue === option.value
                }"
                role="option"
                @click="() => selectOption(option)"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { SelectHTMLAttributes } from 'vue';
import {
    getModalPosition,
    type ModalPosition,
    type ModalPositionItem,
    type ModalPositionType,
} from '~/lib/modal/getModalPosition';


type Option = { value: string, label: string };

interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
    modelValue?: string;
    options: Array<Option>;
    modalPosition?: ModalPositionType;
}

const getElementOffset = function (offset: ModalPositionItem) {
    if (typeof offset === 'string') {
        return offset;
    }

    return offset + 'px';
};
const getElementSize   = function (size: number | string) {
    if (typeof size === 'string' || !size) {
        return size;
    }

    return size + 'px';
};

const emits             = defineEmits([ 'update:modelValue', 'change' ]);
const props             = defineProps<Props>();
const modalPositionType = props.modalPosition ?? 'bottom-left';
const isOpen            = ref(false);
const hoveredIndex      = ref(props.options.findIndex((option) => option.value === props.modelValue));
const parent            = useTemplateRef<HTMLDivElement>('parent');
const modal             = useTemplateRef<HTMLDivElement>('modal');
const modalPosition     = ref<ModalPosition>(getModalPosition(parent.value, modal.value, modalPositionType));
const toggleTimer       = ref<number>(0);
const preopen           = ref(false);

const selectedLabel       = computed(() => {
    const selected = props.options.find((option) => option.value === props.modelValue);
    return selected ? selected.label : '';
});
const smartClose          = function (event: Event) {
    if (isOpen.value) {
        event.preventDefault();
    }

    close();
};
const toggleDropdown      = function () {
    // 50ms - minimal toggle interval (fix for mobile)
    if (toggleTimer.value < (Date.now() - 50)) {
        toggleTimer.value = Date.now();
        if (isOpen.value) {
            close();
        } else {
            open();
        }
    }
};
const open                = function () {
    if (!isOpen.value) {
        if (parent.value && modal.value) {
            preopen.value = true;
            requestAnimationFrame(() => {
                updateModalPosition(parent.value, modal.value);
                isOpen.value = true;

                let _index = -1;
                if (props.options.some((option, index) => (option.value === props.modelValue) && ((_index = index) || true))) {
                    hoveredIndex.value = _index;
                }
            });
        }
    }
};
const close               = function () {
    isOpen.value  = false;
    preopen.value = false;
};
const selectOption        = function (option: Option) {
    if (option) {
        emits('update:modelValue', option.value);
        const changeEvent = new Event('change', { bubbles: true });
        parent.value?.dispatchEvent(changeEvent);
        hoveredIndex.value = props.options.findIndex((_option) => _option.value === option.value);
        close();
    }
};
const navigate            = function (direction: number) {
    hoveredIndex.value = (hoveredIndex.value + direction + props.options.length) % props.options.length;

    if (!isOpen.value) {
        selectOption(props.options[hoveredIndex.value]);
    }
};
const updateModalPosition = function (parent: HTMLElement | null, modal: HTMLElement | null) {
    modalPosition.value = getModalPosition(parent, modal, modalPositionType);
};


defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.container {
    position   : relative;
    display    : inline-block;
    outline    : none;
    min-height : fit-content;

    &:focus {
        > .label {
            border     : 1px solid var(--primary-color);
            outline    : 1px solid var(--primary-color);
            background : var(--bg-second);
        }
    }

    &.opened {
        > .modal {
            visibility : visible;
            opacity    : 1;
            transform  : translateY(var(--offset-small));
            min-width  : auto !important;

            &.inverse {
                transform : translateY(calc(-1 * var(--offset-small)));
            }
        }

        > .label {
            border : 1px solid var(--primary-color);

            svg {
                transform : rotate(180deg);

                line {
                    stroke : var(--primary-color);
                }
            }
        }
    }

    > .label {
        padding         : var(--offset-small) var(--offset-medium);
        background      : var(--bg-main);
        border          : 1px solid var(--border-color);
        transition      : var(--fast);
        border-radius   : var(--offset-small);
        display         : inline-flex;
        justify-content : space-between;
        align-items     : center;
        cursor          : default;
        gap             : var(--offset-medium);
        user-select     : none;
        outline         : 1px solid transparent;
        width           : 100%;
        height          : var(--all-input-height-medium);

        > .text {
            white-space   : nowrap;
            overflow      : hidden;
            text-overflow : ellipsis;

            &.empty {
                color : var(--color-invisible);
            }
        }

        > svg {
            transition : var(--fast);
            min-width  : fit-content;

            > line {
                stroke       : var(--border-color);
                stroke-width : 2px;
            }
        }

        &:hover {
            background : var(--bg-second);
        }
    }

    > .modal {
        position        : absolute;
        visibility      : hidden;
        opacity         : 0;
        transition      : opacity, visibility, transform var(--fast);
        transform       : translateY(0);
        background      : var(--bg-main);
        border          : 1px solid var(--border-color);
        border-radius   : var(--offset-small);
        display         : flex;
        flex-direction  : column;
        gap             : var(--offset-small);
        list-style-type : none;
        z-index         : 10;

        /* */
        width           : 0;
        height          : 0;
        padding         : 0;
        overflow        : hidden;
        overflow-y      : auto;

        &.preopened {
            width     : auto;
            height    : auto;
            min-width : fit-content;
            padding   : var(--offset-small);
        }

        &.wrap {
            > li {
                white-space : wrap;
            }
        }

        > li {
            transition    : var(--fast);
            cursor        : pointer;
            padding       : var(--offset-small) var(--offset-medium);
            border-radius : var(--offset-small);
            display       : flex;
            align-items   : center;
            gap           : var(--offset-small);
            white-space   : nowrap;

            &:before {
                content     : '->';
                white-space : nowrap;
                visibility  : hidden;
                opacity     : 0;
                transition  : var(--fast);
                font-size   : var(--font-size-s);
            }

            &.active,
            &:hover {
                background : color-mix(in srgb, var(--primary-color), transparent 50%);
            }

            &.active {
                &:before {
                    visibility : visible;
                    opacity    : 1;
                }
            }

            &.hasSelected {
                background : var(--primary-color);
                color      : var(--primary-color-inv);
            }
        }
    }
}
</style>