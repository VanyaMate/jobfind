<template>
    <div class="companyPreview-container">
        <div class="left">
            <AppImage :src="props.company.logo" :alt="`Логотип ${props.company.title}`"/>
        </div>
        <div class="right">
            <h3>{{ props.company.title }}</h3>
            <p>
                <AppText :color="AppTextColor.INVISIBLE">{{ props.company.description }}</AppText>
            </p>
            <footer>
                <AppText :color="AppTextColor.INVISIBLE">Отделов: {{ props.company.branches?.length ?? 0 }}</AppText>
                <AppText :color="AppTextColor.INVISIBLE">Создано: {{ createdAt }}</AppText>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { Company } from '~/types/company/company';
import AppImage from '~/components/app/img/AppImage/AppImage.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppText from '~/components/app/typography/AppText/AppText.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    company: Company;
}

const props = defineProps<Props>();

const createdAt = computed(() => new Date(props.company.createdAt).toLocaleDateString());

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.companyPreview-container {
    display       : flex;
    gap           : var(--offset-medium);
    background    : var(--bg-second);
    border        : 1px solid var(--border-color);
    padding       : var(--offset-large);
    border-radius : var(--offset-large);

    .left {
        img {
            width  : 200px;
            height : 200px;
        }
    }

    .right {
        display        : flex;
        flex-direction : column;
        gap            : var(--offset-medium);

        footer {
            display         : flex;
            gap             : var(--offset-medium);
            justify-content : space-between;
            align-items     : center;
            font-size       : var(--font-size-s);
        }
    }
}
</style>