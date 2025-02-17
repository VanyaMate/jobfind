<template>
    <slot name="trigger" :open="open" :close="close" :isOpened="isOpened">Триггер не указан</slot>
    <teleport to="body">
        <div :class="['container', { opened: isOpened }]">
            <div class="background" @click.self="close"/>
            <div class="modal" ref="modal-anchor">
                <div class="header">
                    <slot name="title"></slot>
                    <AppButton
                        @click="close"
                        class="closeButton"
                        :size="AppButtonSize.MEDIUM"
                        :style-type="AppButtonStyleType.INVISIBLE"
                    >
                        <svg width="10px" height="10px">
                            <line x1="0" y1="10" x2="10" y2="0"/>
                            <line x1="0" y1="0" x2="10" y2="10"/>
                        </svg>
                    </AppButton>
                </div>
                <slot name="content" :close="close" :isOpened="isOpened">Контент не указан</slot>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


interface Props extends /* @vue-ignore */ HTMLAttributes {
}

const props          = defineProps<Props>();
const isOpened       = ref(false);
const modalAnchorRef = useTemplateRef<HTMLDivElement>('modal-anchor');
const previousFocus  = ref<HTMLElement | null>(null);

const open  = function () {
    isOpened.value      = true;
    previousFocus.value = document.activeElement as HTMLElement;
    document.body.querySelector('#__nuxt')?.setAttribute('inert', 'true');
    modalAnchorRef.value?.focus();
};
const close = function () {
    isOpened.value = false;
    document.body.querySelector('#__nuxt')?.removeAttribute('inert');
    previousFocus.value?.focus();
};

onUnmounted(close);

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.container {
    position        : fixed;
    top             : 0;
    left            : 0;
    width           : 100dvw;
    height          : 100dvh;
    align-items     : safe center;
    justify-content : center;
    display         : flex;
    z-index         : 150;
    visibility      : hidden;
    opacity         : 0;
    transition      : visibility, opacity var(--fast);

    &.opened {
        visibility : visible;
        opacity    : 1;

        > .modal {
            transform : scale(1);
        }
    }

    .background {
        position   : absolute;
        top        : 0;
        left       : 0;
        width      : 100%;
        height     : 100%;
        z-index    : 0;
        background : color-mix(in srgb, var(--bg-main), transparent 40%);
    }

    .modal {
        position      : relative;
        z-index       : 1;
        padding       : var(--offset-large);
        border-radius : var(--offset-large);
        background    : var(--bg-main);
        border        : 1px solid var(--border-color);
        transform     : scale(.8);
        transition    : transform var(--fast);
        max-width     : calc(100dvw - var(--offset-large) * 2);
        max-height    : calc(100dvh - var(--offset-large) * 2);
        overflow      : hidden;
        overflow-y    : auto;

        .header {
            display         : flex;
            align-items     : start;
            justify-content : space-between;
            gap             : var(--offset-small);
            margin-bottom   : var(--offset-medium);

            .closeButton {
                padding    : var(--offset-small);
                min-width  : var(--all-input-height-medium);
                max-width  : var(--all-input-height-medium);
                text-align : center;

                svg {
                    transition : var(--fast);
                    min-width  : fit-content;
                    display    : inline-block;

                    > line {
                        stroke       : var(--border-color);
                        stroke-width : 2px;
                    }
                }
            }
        }
    }
}
</style>