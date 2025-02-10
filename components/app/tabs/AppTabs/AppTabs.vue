<template>
    <div
        class="container"
        tabindex="0"
        @keydown.right="() => navigate(1)"
        @keydown.left="() => navigate(-1)"
    >
        <div
            :class="['marker', {show: !~selected}]"
            :style="{ width: itemWidth, transform: `translateX(${markerPosition})` }"
        />
        <div
            v-for="(option, index) in props.options"
            :key="option"
            :class="['item', { 'selected': index === selected }]"
            :style="{ width: itemWidth }"
            @click="() => selectOption(index)"
        >
            {{ option }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { AppTabItem } from '~/components/app/tabs/AppTabs/types/AppTabs.types';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    options: Array<AppTabItem>;
    modelValue?: string;
}

const props          = defineProps<Props>();
const itemWidth      = ref(`calc((100% - ${ props.options.length - 1 } * var(--offset-small)) / ${ props.options.length })`);
const index          = props.options.findIndex((item) => item === props.modelValue);
const selected       = ref<number>(index === -1 ? 0 : index);
const markerPosition = computed(() => `calc(100% * ${ selected.value } + ${ selected.value } * var(--offset-small))`);

const emits        = defineEmits([ 'update:modelValue' ]);
const selectOption = function (index: number) {
    if (index !== selected.value) {
        selected.value = index;
        emits('update:modelValue', props.options[index]);
    }
};
const navigate     = function (offset: number) {
    selectOption((props.options.length + selected.value + offset) % props.options.length);
};

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.container {
    display         : flex;
    align-items     : center;
    position        : relative;
    justify-content : space-between;
    gap             : var(--offset-small);
    outline         : 2px solid transparent;
    border-radius   : var(--offset-small);
    transition      : var(--fast);

    &:focus {
        outline : 2px solid var(--primary-color);
    }

    .marker {
        position      : absolute;
        background    : var(--primary-color);
        border-radius : var(--offset-small);
        height        : var(--all-input-height-medium);
        z-index       : 1;
        transform     : translateX(0);
        transition    : var(--fast);

        &.show {
            visibility : hidden;
            opacity    : 0;
        }
    }

    .item {
        position        : relative;
        z-index         : 2;
        height          : var(--all-input-height-medium);
        padding         : 0 var(--offset-small);
        display         : inline-flex;
        align-items     : center;
        justify-content : center;
        cursor          : pointer;
        color           : var(--color-invisible);
        transition      : var(--fast);

        &.selected {
            color : var(--primary-color-inv);
        }

        &:hover:not(.selected) {
            color : var(--color-main);
        }
    }
}

</style>