<template>
    <AppTag v-for="format in props.formats" :style-type="getFormatStyleType(format)">
        {{ getFormatName(format) }}
    </AppTag>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppTag from '~/components/app/tag/AppTag/AppTag.vue';
import { VacancyFormat } from '~/types/vacancy/vacancy';
import { AppTagType } from '~/components/app/tag/AppTag/types/AppTagType';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    formats: Array<VacancyFormat>;
}

const props         = defineProps<Props>();
const getFormatName = function (format: VacancyFormat) {
    if (format === VacancyFormat.REMOTE) {
        return 'Удаленно';
    } else if (format === VacancyFormat.OFFICE) {
        return 'В офисе';
    }

    return 'Неизвестный формат';
};

const getFormatStyleType = function (format: VacancyFormat): AppTagType {
    if (format === VacancyFormat.REMOTE) {
        return AppTagType.RAINBOW;
    } else if (format === VacancyFormat.OFFICE) {
        return AppTagType.INVISIBLE;
    }

    return AppTagType.INVISIBLE;
};

defineOptions({
    inheritAttrs: true,
});
</script>