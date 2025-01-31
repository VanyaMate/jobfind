<template>
    <h1>HomePage</h1>
    <SwitchTheme/>
    <AppForm @submit.prevent="form.handleSubmit(onSubmit)">
        <AppInput placeholder="Email" v-model="email" v-bind="emailProps"/>
        {{ form.errors }}
        <AppButton type="submit" :style-type="AppButtonStyleType.DEFAULT">Default</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.SECONDARY">Secondary</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.PRIMARY" :size="AppButtonSize.SMALL">Primary
        </AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.DANGER" :size="AppButtonSize.MEDIUM">Danger</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.WARNING" :size="AppButtonSize.LARGE">Warning
        </AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.INVISIBLE">Invisible</AppButton>

        <AppButton type="submit" :style-type="AppButtonStyleType.DEFAULT" quad>D</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.SECONDARY" quad>S</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.PRIMARY" quad :size="AppButtonSize.SMALL">P</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.DANGER" quad :size="AppButtonSize.MEDIUM">D</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.WARNING" quad :size="AppButtonSize.LARGE">W</AppButton>
        <AppButton type="submit" :style-type="AppButtonStyleType.INVISIBLE" quad>I
        </AppButton>
    </AppForm>
</template>

<script lang="ts">
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import { useForm } from 'vee-validate';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';


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
            email, emailProps, form, AppButtonStyleType, AppButtonSize,
        };
    },
};

</script>