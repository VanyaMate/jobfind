<template>
    <AppForm @submit="submit">
        <AppTopLabel>
            <template v-slot:label>
                Почта
            </template>
            <template v-slot:input>
                <AppInput
                    v-model="email"
                    v-bind="emailProps"
                    placeholder="Введите почту"
                />
            </template>
        </AppTopLabel>
        <AppTopLabel>
            <template v-slot:label>
                Логин
            </template>
            <template v-slot:input>
                <AppInput
                    v-model="login"
                    v-bind="loginProps"
                    placeholder="Введите логин"
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
        <AppTopLabel>
            <template v-slot:label>
                Повторный пароль
            </template>
            <template v-slot:input>
                <AppInput
                    v-model="password2"
                    v-bind="password2Props"
                    type="password"
                    placeholder="Введите пароль еще раз"
                />
            </template>
        </AppTopLabel>
        <AppCheckbox v-model="remember" v-bind="rememberProps">Запомнить меня</AppCheckbox>
        <AppButton :style-type="AppButtonStyleType.PRIMARY">Зарегистрироваться</AppButton>
    </AppForm>
    <AppButton @click="googleAuth">Google</AppButton>
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
import type { RegistrationData } from '~/types/authorization/registration-data';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

const googleAuth = function () {
    window.location.href = '/api/v1/auth/google';
};

const form                          = useForm<RegistrationData & { password2: string }>({
    initialValues: {
        email    : '',
        login    : '',
        password : '',
        password2: '',
        remember : false,
    },
});
const submit                        = form.handleSubmit((data) => {
    fetch('/api/v1/auth/registration', {
        method: 'POST',
        body  : JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                navigateTo('/');
            }
        });
});
const [ email, emailProps ]         = form.defineField('email', {
    validateOnInput      : true,
    validateOnModelUpdate: true,
});
const [ login, loginProps ]         = form.defineField('login', {
    validateOnInput      : true,
    validateOnModelUpdate: true,
});
const [ password, passwordProps ]   = form.defineField('password', {
    validateOnInput      : true,
    validateOnModelUpdate: true,
});
const [ password2, password2Props ] = form.defineField('password2', {
    validateOnInput      : true,
    validateOnModelUpdate: true,
});
const [ remember, rememberProps ]   = form.defineField('remember');

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>

</style>