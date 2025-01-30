<template>
    <h1>HomePage</h1>
    <SwitchTheme/>
    <AppForm @submit.prevent="form.handleSubmit(onSubmit)">
        <AppInput placeholder="Email" v-model="email" v-bind="emailProps"/>
        {{ form.errors }}
        <button type="submit">Submit</button>
    </AppForm>
</template>

<script setup lang="ts">
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import { useForm } from 'vee-validate';


const onSubmit = function (data: any) {
    console.log('submit', data);
};

const simpleSchema = {
    email (value: string) {
        console.log(`Email validate: ${ value }`);

        if (value?.length > 5) {
            return true;
        }

        return 'Длина не такая';
    },
};

const form = useForm<{ email: string }>({
    validationSchema: simpleSchema,
});

const [ email, emailProps ] = form.defineField('email', {
    validateOnChange: true,
});

</script>