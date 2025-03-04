<template>
    <div class="index-container">
        <AppText :color="AppTextColor.INVISIBLE" v-if="companies.length === 0">
            У вас еще не создано ни одной компании
        </AppText>
        <CompanyPreview v-else v-for="company in companies" :company="company" :key="company.id"/>
        <AppModal>
            <template v-slot:title>
                <h3>Создать компанию</h3>
            </template>
            <template v-slot:content>
                <CreateCompanyForm/>
            </template>
            <template v-slot:trigger="{ open }">
                <AppButton
                    :style-type="companies.length ? AppButtonStyleType.DEFAULT : AppButtonStyleType.PRIMARY"
                    @click="open"
                >
                    Создать новую компанию
                </AppButton>
            </template>
        </AppModal>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import type { Company } from '~/types/company/company';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppModal from '~/components/app/modal/AppModal/AppModal.vue';
import CreateCompanyForm from '~/components/company/widget/CreateCompanyForm/CreateCompanyForm.vue';
import CompanyPreview from '~/components/company/entity/CompanyPreview/CompanyPreview.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props     = defineProps<Props>();
const companies = await $fetch<Array<Company>>(`/api/v1/company/my`, { credentials: 'include', method: 'GET' });


defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.index-container {
    display         : flex;
    flex-direction  : column;
    gap             : var(--offset-medium);
    align-items     : center;
    justify-content : safe center;
    width           : 600px;
    max-width       : 100%;
    min-height      : 100%;
    margin          : auto;
}
</style>