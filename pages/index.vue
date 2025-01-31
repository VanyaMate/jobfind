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
import { emailValidator } from '~/lib/validator/email.validator';


const simpleSchema = {
    email: emailValidator,
};

const form = useForm<{ email: string }>({
    validationSchema: simpleSchema,
});

const onSubmit = form.handleSubmit(async (data: any, actions) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(JSON.stringify(data));
    actions.resetForm();
});

const [ email, emailProps ] = form.defineField('email', {
    validateOnBlur       : true,
    validateOnChange     : false,
    validateOnInput      : false,
    validateOnModelUpdate: false,
});

</script>