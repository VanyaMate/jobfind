<template>
    <div class="index-container">
        <div class="list companyList hasSelected">
            <AppButton
                :style-type="AppButtonStyleType.DEFAULT"
            >
                Создать компанию
            </AppButton>
            <ShortPreview
                title="Ozon"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="selected item"
            />
            <ShortPreview
                title="Ozon"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
            <ShortPreview
                title="Ozon"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
        </div>
        <div class="list companyBranchList">
            <AppButton
                :style-type="AppButtonStyleType.DEFAULT"
            >
                Создать отдел
            </AppButton>
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="selected item"
            />
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
            <ShortPreview
                title="Отдел разработки"
                avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                primary
                class="item"
            />
        </div>
        <div class="list vacancyList">
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
            <VacancyPreview/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import ShortPreview from '~/components/common/ShortPreview/ShortPreview.vue';
import VacancyPreview from '~/components/vacancy/VacancyPreview/VacancyPreview.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.index-container {
    display        : flex;
    flex-direction : row;
    gap            : var(--offset-medium);
}

.list {
    display        : flex;
    flex-direction : column;
    gap            : var(--offset-medium);
    transition     : var(--fast);
}

.item {
    padding       : var(--offset-small);
    border        : 1px solid var(--border-color);
    border-radius : var(--offset-medium);
    cursor        : pointer;

    & > * {
        opacity : .6;
    }

    &:hover:not(.selected) {
        & > * {
            opacity : 1;
        }
    }

    &.selected {
        background : var(--bg-second);
        border     : 1px solid var(--primary-color);

        & > * {
            opacity : 1;
        }
    }
}

.companyList {
    min-width : 300px;
    max-width : 300px;
    overflow  : hidden;

    &.hasSelected {
        min-width : calc(var(--all-input-height-medium) + var(--offset-small) * 2 + 2px);
        max-width : calc(var(--all-input-height-medium) + var(--offset-small) * 2 + 2px);

        &:hover {
            min-width : 300px;
            max-width : 300px;
        }
    }
}

.companyBranchList {
    min-width : 300px;
}

.vacancyList {
    width : 100%;
}
</style>