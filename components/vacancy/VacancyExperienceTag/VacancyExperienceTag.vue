<template>
    <AppTag :style-type="tagData[1]">
        {{ tagData[0] }}
    </AppTag>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AppTagType } from '~/components/app/tag/AppTag/types/AppTagType';
import AppTag from '~/components/app/tag/AppTag/AppTag.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    experience: number;
}

const props   = defineProps<Props>();
const tagData = computed<[ string, AppTagType ]>(() => {
    if (props.experience === 1) {
        return [ 'От 1 года', AppTagType.SECOND ];
    } else if (props.experience === 2) {
        return [ 'От 2 лет', AppTagType.MAIN ];
    } else if (props.experience === 3) {
        return [ 'От 3 лет', AppTagType.PRIMARY ];
    } else if (props.experience === 4) {
        return [ 'От 4 лет', AppTagType.WARNING ];
    } else if (props.experience === 5) {
        return [ 'От 5 лет', AppTagType.DANGER ];
    }

    return [ 'Без опыта', AppTagType.INVISIBLE ];
});

defineOptions({
    inheritAttrs: true,
});
</script>