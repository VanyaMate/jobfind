<template>
    <div class="vacancySalary-container" v-if="props.min && props.max">
        <template v-if="props.min === props.max">
            <AppText :color="AppTextColor.MAIN">{{ props.min }} {{ props.currency }}</AppText>
        </template>
        <template v-else-if="props.min < props.max">
            <AppText :color="AppTextColor.INVISIBLE" class="text">от&nbsp</AppText>
            <AppText :color="AppTextColor.MAIN">{{ props.min }} ₽</AppText>
            <AppText :color="AppTextColor.INVISIBLE" class="text">&nbspдо&nbsp</AppText>
            <AppText :color="AppTextColor.MAIN">{{ props.max }} ₽</AppText>
        </template>
        <AppText :color="AppTextColor.INVISIBLE" class="text">
            <template v-if="props.afterTax">&nbspна руки</template>
            <template v-else>&nbspдо вычета налогов</template>
        </AppText>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { SalaryCurrency } from '~/types/vacancy/vacancy';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppText from '~/components/app/typography/AppText/AppText.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    min: number;
    max: number;
    currency: SalaryCurrency;
    afterTax: boolean;
}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.vacancySalary-container {
    font-size : var(--font-size-l);

    .text {
        font-size : var(--font-size-m);
    }
}
</style>