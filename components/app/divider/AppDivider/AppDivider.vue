<template>
    <div :class="['appDivider-container', props.type]">

    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AppDividerType } from '~/components/app/divider/AppDivider/types/AppDividerType';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    type?: AppDividerType;
}

const props = withDefaults(defineProps<Props>(), { type: AppDividerType.HORIZONTAL });

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.appDivider-container {
    &.horizontal {
        width         : 100%;
        height        : 0;
        border-bottom : 1px dashed var(--border-color);
        margin        : var(--offset-small) 0;
    }

    &.vertical {
        width        : 0;
        height       : 100%;
        border-right : 1px dashed var(--border-color);
    }
}
</style>