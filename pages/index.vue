<template>
    <h1>HomePage</h1>
    <SwitchTheme/>
    <AppForm @submit.prevent="form.handleSubmit(onSubmit)">
        <AppInput placeholder="Email" v-model="email" v-bind="emailProps"/>
        {{ form.errors }}
        <AppButton type="submit" :style-type="AppButtonStyleTypeTypes.PRIMARY">
            Submit
        </AppButton>
    </AppForm>
</template>

<script lang="ts">
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleTypeTypes } from '~/components/app/buttons/types/AppButtonStyleType.types';
import { useForm } from 'vee-validate';


export default {
    components: { AppButton, AppForm, AppInput, SwitchTheme },
    methods   : {
        onSubmit (data: any) {
            console.log('submit', data);
        },
    },
    data () {
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

        return {
            email, emailProps, form, AppButtonStyleTypeTypes,
        };
    },
};

</script>