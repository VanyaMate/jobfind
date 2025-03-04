<template>
    <AppForm class="createCompanyForm-container" @submit="onSubmit">
        <AppTopLabel>
            <template v-slot:label>
                Название компании
            </template>
            <template v-slot:input>
                <AppInput v-model="title" placeholder="Пельмешево"/>
            </template>
        </AppTopLabel>

        <AppTopLabel>
            <template v-slot:label>
                Описание компании
            </template>
            <template v-slot:input>
                <AppTextArea v-model="description" placeholder="Лучшие пельмешки"/>
            </template>
        </AppTopLabel>

        <AppTopLabel>
            <template v-slot:label>
                Логотип
            </template>
            <template v-slot:input>
                <AppFileInput @change="handleFileUpload"/>
            </template>
        </AppTopLabel>

        <AppButton type="submit">Создать</AppButton>
    </AppForm>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { CompanyCreateData } from '~/types/company/company-create-data';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import AppTextArea from '~/components/app/inputs/AppTextArea/AppTextArea.vue';
import AppFileInput from '~/components/app/inputs/AppFileInput/AppFileInput.vue';
import type { ValidResponse } from '~/types/common/valid-response';


const form = useForm<CompanyCreateData>({
    initialValues: {
        title      : '',
        description: '',
        logo       : undefined,
    },
});

const [ title ]       = form.defineField('title');
const [ description ] = form.defineField('description');
const [ logo ]        = form.defineField('logo');

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
        logo.value = target.files[0]; // Сохраняем файл в поле формы
    }
};

const onSubmit = form.handleSubmit(async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);

    if (values.logo) {
        formData.append('logo', values.logo);
    }

    try {
        const response = await $fetch<ValidResponse>('/api/v1/company', {
            method: 'POST',
            body  : formData,
        });

        alert(response);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
});

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