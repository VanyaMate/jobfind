<template>
    <div
        ref="parent"
        :class="['container', { opened: isOpen }]"
        :aria-expanded="isOpen"
        tabindex="0"
        @keydown.esc="close"
        @keydown.space.prevent.self="toggleDropdown"
        @blur="blurClose"
    >
        <div
            class="label"
            @click="toggleDropdown"
        >
            <span class="text">
                {{ props.text }}
            </span>
            <svg width="10px" height="7px">
                <line x1="0" y1="0" x2="5" y2="6"/>
                <line x1="5" y1="6" x2="10" y2="0"/>
            </svg>
        </div>
        <div
            :class="[
                'modal',
                { inverse: modalPosition.top === 'auto' },
                { fullscreen: !modalPosition.maxWidth || !modalPosition.maxHeight },
                { preopened: preopen }
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
            <slot/>
        </div>
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
import { isChildOf } from '~/lib/dom/isChildOf';


interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
    text: string;
    closeOnFocus?: boolean;
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

const props             = defineProps<Props>();
const modalPositionType = props.modalPosition ?? 'bottom-left';
const isOpen            = ref(false);
const parent            = useTemplateRef<HTMLDivElement>('parent');
const modal             = useTemplateRef<HTMLDivElement>('modal');
const modalPosition     = ref<ModalPosition>(getModalPosition(parent.value, modal.value, modalPositionType));
const toggleTimer       = ref<number>(0);
const preopen           = ref(false);
const handler           = function (event: Event) {
    const target = event.target as HTMLElement;
    if (!isChildOf(target, parent.value!)) {
        close();
    }
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
                document.addEventListener('click', handler);
            });
        }
    }
};
const blurClose           = function () {
    if (props.closeOnFocus) {
        close();
    }
};
const close               = function () {
    isOpen.value  = false;
    preopen.value = false;
    document.removeEventListener('click', handler);
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

            &.inverse {
                transform : translateY(calc(-1 * var(--offset-small)));
            }
        }

        > .label {
            border : 1px solid var(--primary-color);

            > svg {
                transform : rotate(180deg);

                > line {
                    stroke : var(--primary-color);
                }
            }
        }
    }

    > .label {
        padding         : 0 var(--offset-medium);
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
        border-radius   : var(--offset-medium);
        display         : flex;
        flex-direction  : column;
        gap             : var(--offset-small);
        list-style-type : none;
        z-index         : 5;
        min-width       : fit-content;

        /* */
        width           : 0;
        height          : 0;
        padding         : 0;

        &.preopened {
            width   : auto;
            height  : auto;
            padding : var(--offset-medium);
        }
    }
}
</style>