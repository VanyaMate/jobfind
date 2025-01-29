<template>
    <h1>HomePage</h1>
    <SwitchTheme/>
    <Form @submit="onSubmit" :validation-schema="simpleSchema">
        <Field name="email" :as="Input"></Field>
        <ErrorMessage name="email"/>
        <button type="submit">Submit</button>
    </Form>
</template>
<script setup lang="ts">
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import Input from '~/components/app/inputs/Input/Input.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';


const onSubmit = function () {
    console.log('submit');
};

const simpleSchema = {
    email (value: string) {
        if (value.length > 5) {
            return true;
        }

        return 'Длина не такая';
    },
};

</script>