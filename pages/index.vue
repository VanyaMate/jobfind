<template>
    <h1>HomePage</h1>
    <SwitchTheme/>
    <AppForm @submit="onSubmit">
        <h2>Inputs</h2>
        <AppInput
            placeholder="Email"
            v-model="email"
            v-bind="emailProps"
            :error="form.errors.value.email"
        />
        <AppButton
            type="submit"
            :style-type="AppButtonStyleType.DEFAULT"
            :loading="form.isSubmitting.value"
            :size="AppButtonSize.LARGE"
        >
            Submit
        </AppButton>
    </AppForm>
</template>

<script lang="ts" setup>
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import { useForm } from 'vee-validate';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';


const simpleSchema = {
    email (value: string) {
        if (value?.length > 5) {
            return true;
        }

        return 'Длина не такая';
    },
};

const form = useForm<{ email: string }>({
    validationSchema: simpleSchema,
});

const onSubmit = form.handleSubmit(async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(JSON.stringify(data));
});

const [ email, emailProps ] = form.defineField('email', {
    validateOnChange: true,
});

</script>