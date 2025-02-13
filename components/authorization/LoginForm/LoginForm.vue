<template>
    <AppForm @submit="submit">
        <AppTopLabel>
            <template v-slot:label>
                Логин / Почта
            </template>
            <template v-slot:input>
                <AppInput
                    v-model="login"
                    v-bind="loginProps"
                    placeholder="Введите логин или почту"
                />
            </template>
        </AppTopLabel>
        <AppTopLabel>
            <template v-slot:label>
                Пароль
            </template>
            <template v-slot:input>
                <AppInput
                    v-model="password"
                    v-bind="passwordProps"
                    type="password"
                    placeholder="Введите пароль"
                />
            </template>
        </AppTopLabel>
        <AppCheckbox v-model="remember" v-bind="rememberProps">Запомнить меня</AppCheckbox>
        <AppButton :style-type="AppButtonStyleType.PRIMARY">Войти</AppButton>
    </AppForm>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppCheckbox from '~/components/app/inputs/AppCheckbox/AppCheckbox.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import { useForm } from 'vee-validate';
import type { LoginData } from '~/types/authorization/login-data';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props                       = defineProps<Props>();
const form                        = useForm<LoginData>({
    initialValues: {
        login   : '',
        password: '',
        remember: false,
    },
});
const submit                      = form.handleSubmit(async (data) => {
    await fetch('/api/auth/login', {
        method     : 'POST',
        body       : JSON.stringify(data),
        credentials: 'same-origin',
    })
        .then((response) => {
            if (response.ok) {
                navigateTo('/');
            }
        });
});
const [ login, loginProps ]       = form.defineField('login', {
    validateOnInput      : true,
    validateOnModelUpdate: true,
});
const [ password, passwordProps ] = form.defineField('password', {
    validateOnInput      : true,
    validateOnModelUpdate: true,
});
const [ remember, rememberProps ] = form.defineField('remember', {});

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>

</style>