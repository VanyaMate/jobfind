<template>
    <div
        ref="parent"
        :class="['container', { opened: isOpen }]"
        :aria-expanded="isOpen"
        tabindex="0"
        @keydown.esc="close"
        @keydown.space.prevent="open"
        @keydown.tab="close"
        @focus="open"
        @blur="blurClose"
    >
        <div
            class="label"
            @click="toggleDropdown"
            @mouseenter="open"
            @mouseleave="close"
        >
            <slot name="label">label</slot>
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
            <slot name="modal">Default slot</slot>
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

const props               = defineProps<Props>();
const modalPositionType   = props.modalPosition ?? 'bottom-left';
const isOpen              = ref(false);
const parent              = useTemplateRef<HTMLDivElement>('parent');
const modal               = useTemplateRef<HTMLDivElement>('modal');
const modalPosition       = ref<ModalPosition>(getModalPosition(parent.value, modal.value, modalPositionType));
const toggleTimer         = ref<number>(0);
const preopen             = ref(false);
const handler             = function (event: Event) {
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
    close();
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
    }

    > .label {
        border-radius : var(--offset-small);
        outline       : 1px solid transparent;
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
        z-index         : 5;
        min-width       : fit-content;

        /* */
        width           : 0;
        height          : 0;
        padding         : 0;

        &.preopened {
            width   : auto;
            height  : auto;
            padding : var(--offset-small);
        }
    }
}
</style>