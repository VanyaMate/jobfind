<template>
    <div class="index-container">
        <AppText :color="AppTextColor.INVISIBLE">
            У вас еще не создано ни одной компании
        </AppText>
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
import { SymbolKind } from 'vscode-languageserver-types';
import type { Company } from '~/types/company/company';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import Array = SymbolKind.Array;
import AppModal from '~/components/app/modal/AppModal/AppModal.vue';
import CreateCompanyForm from '~/components/common/widget/CreateCompanyForm/CreateCompanyForm.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props     = defineProps<Props>();
const companies = ref<Array<Company>>([]);

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