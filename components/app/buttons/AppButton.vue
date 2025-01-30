<template>
    <button :class="props.styleType">
        <slot/>
    </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';
import { AppButtonStyleTypeTypes } from '~/components/app/buttons/types/AppButtonStyleType.types';


interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    styleType?: AppButtonStyleTypeTypes;
};

const props = withDefaults(defineProps<Props>(), {
    styleType (props) {
        return props.styleType ?? AppButtonStyleTypeTypes.DEFAULT;
    },
});
console.log(props);

</script>

<style scoped>
button {
    min-height : var(--all-input-height);
    padding    : var(--offset-small);

    &.primary {
        background : blue;
    }

    &.danger {
        background : red;
    }
}
</style>

