<template>
    <AppForm class="createCompanyForm-container">
        <AppTopLabel>
            <template v-slot:label>
                Название компании
            </template>
            <template v-slot:input>
                <AppInput placeholder="Пельмешево"/>
            </template>
        </AppTopLabel>
        <AppTopLabel>
            <template v-slot:label>
                Описание компании
            </template>
            <template v-slot:input>
                <AppTextArea placeholder="Лучшие пельмешки"/>
            </template>
        </AppTopLabel>
        <AppTopLabel>
            <template v-slot:label>
                Логотип
            </template>
            <template v-slot:input>
                <AppFileInput/>
            </template>
        </AppTopLabel>
        <AppButton>Создать</AppButton>
    </AppForm>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import AppTextArea from '~/components/app/inputs/AppTextArea/AppTextArea.vue';
import AppFileInput from '~/components/app/inputs/AppFileInput/AppFileInput.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.createCompanyForm-container {
    width     : 400px;
    max-width : 100%;
}
</style>