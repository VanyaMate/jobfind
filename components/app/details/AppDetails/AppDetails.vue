<template>
    <details ref="details">
        <summary>
            <slot name="summary" :close="close" :open="open">Summary</slot>
            <svg width="10px" height="7px">
                <line x1="0" y1="0" x2="5" y2="6"/>
                <line x1="5" y1="6" x2="10" y2="0"/>
            </svg>
        </summary>
        <div class="content">
            <slot name="content" :close="close" :open="open">Content</slot>
        </div>
    </details>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props      = defineProps<Props>();
const detailsRef = useTemplateRef<HTMLDetailsElement>('details');
const open       = function () {
    detailsRef.value?.setAttribute('open', 'true');
};
const close      = function () {
    detailsRef.value?.removeAttribute('open');
};

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
details {
    border-radius : var(--offset-small);
    border        : 1px solid var(--border-color);

    &:focus-within {
        border : 1px solid var(--primary-color);

        .content {
            border-top : 1px solid var(--primary-color);
        }
    }

    &[open] > summary > svg {
        transform : rotate(180deg);

        & > line {
            stroke : var(--primary-color);
        }
    }

    summary {
        display         : flex;
        justify-content : space-between;
        align-items     : center;
        padding         : var(--offset-small);

        &:focus {
            outline       : 2px solid var(--primary-color);
            border-radius : var(--offset-small);
        }

        /* Safari */

        &::-webkit-details-marker {
            display : none;
        }

        /* Firefox + Chrome */

        &::marker {
            content : '';
        }

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

    .content {
        border-top : 1px solid var(--border-color);
        padding    : var(--offset-small);
    }
}
</style>