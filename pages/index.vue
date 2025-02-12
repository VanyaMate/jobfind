<template>
    <h1>HomePage</h1>
    <div :style="{ display: 'flex', alignItems: 'end', justifyContent: 'end' }">
        <SwitchTheme/>
    </div>
    <AppForm @submit="onSubmit">
        <h2>Inputs</h2>
        <AppInput
            placeholder="Email"
            v-model="email"
            v-bind="emailProps"
            :error="form.errors.value.email"
        />
        <AppSelect
            v-model="amount"
            v-bind="amountProps"
            :options="[
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
                { value: '3', label: 'Three' },
            ]"
        />
        <AppCheckbox
            v-model="rules"
            v-bind="rulesProps"
        />
        <AppRadio v-model="lang" v-bind="langProps" value="Ru"/>
        <AppRadio v-model="lang" v-bind="langProps" value="En"/>
        <AppRadio v-model="lang" v-bind="langProps" value="Fr"/>
        <AppRadio v-model="lang" v-bind="langProps" value="De"/>
        <AppDetails>
            <template v-slot:summary="{ open }">
                <AppButton @click="open" type="button">
                    Summary
                </AppButton>
            </template>
            <template v-slot:content="{ close }">
                <AppButton @click="close" type="button">
                    Text
                </AppButton>
            </template>
        </AppDetails>
        <AppModal>
            <template v-slot:title>
                <h3>any title any title any title any title any title any title any title any title any title any
                    title</h3>
            </template>
            <template v-slot:trigger="{ open }">
                <AppButton @click="open">
                    Open modal
                </AppButton>
            </template>
            <template v-slot:content="{ close }">
                Modal content
                <AppButton @click="close">
                    Close modal
                </AppButton>
            </template>
        </AppModal>
        <AppTabs
            :options="['Radio', 'Checkboxes', 'Tab 3 med']"
            v-model="tabs"
        />
        <div v-if="tabs === 'Radio'">
            Radio
        </div>
        <div v-else-if="tabs === 'Checkboxes'">
            Text some text
            <AppHelper>
                <template v-slot:label>
                    Checkboxes
                </template>
                <template v-slot:modal>
                    Description
                </template>
            </AppHelper>
            Text some text
        </div>
        <AppButton
            type="submit"
            :style-type="AppButtonStyleType.DEFAULT"
            :loading="form.isSubmitting.value"
        >
            Submit
        </AppButton>
        <AppSelect
            v-model="amount"
            v-bind="amountProps"
            :options="[
                { value: '1', label: 'One long name of select' },
                { value: '4', label: '4 long name of select' },
                { value: '5', label: '5long name of select' },
                { value: '2', label: 'Two' },
                { value: '3', label: 'Three' },
            ]"
        />
        <AppDropdown text="Меню">
            <AppButton
                type="submit"
                :style-type="AppButtonStyleType.DEFAULT"
                :loading="form.isSubmitting.value"
            >
                Submit
            </AppButton>
            <AppDropdown text="Меню" on-hover>
                <AppButton
                    type="submit"
                    :style-type="AppButtonStyleType.DEFAULT"
                    :loading="form.isSubmitting.value"
                >
                    Submit
                </AppButton>
                <AppDropdown text="Меню">
                    <AppButton
                        type="submit"
                        :style-type="AppButtonStyleType.DEFAULT"
                        :loading="form.isSubmitting.value"
                    >
                        Submit
                    </AppButton>
                    <AppSelect
                        v-model="amount"
                        v-bind="amountProps"
                        :options="[
                    { value: '1', label: 'One long name of select' },
                    { value: '4', label: '4 long name of select' },
                    { value: '5', label: '5long name of select' },
                    { value: '2', label: 'Two' },
                    { value: '3', label: 'Three' },
                ]"
                    />
                </AppDropdown>
            </AppDropdown>
        </AppDropdown>
    </AppForm>
</template>

<script lang="ts" setup>
import SwitchTheme from '~/components/app/theme/SwitchTheme.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import AppSelect from '~/components/app/select/AppSelect/AppSelect.vue';
import AppCheckbox from '~/components/app/inputs/AppCheckbox/AppCheckbox.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import { useForm } from 'vee-validate';
import { emailValidator } from '~/lib/validator/email.validator';
import AppRadio from '~/components/app/inputs/AppRadio/AppRadio.vue';
import AppTabs from '~/components/app/tabs/AppTabs/AppTabs.vue';
import AppDropdown from '~/components/app/dropdown/AppDropdown/AppDropdown.vue';
import AppHelper from '~/components/app/helpers/AppHelper/AppHelper.vue';
import AppModal from '~/components/app/modal/AppModal/AppModal.vue';
import AppDetails from '~/components/app/details/AppDetails/AppDetails.vue';


const tabs = ref('Checkboxes');

const simpleSchema = {
    email: emailValidator,
};

const form = useForm<{ email: string, amount: string, rules: boolean, languages: boolean }>({
    validationSchema: simpleSchema,
});

const onSubmit = form.handleSubmit(async (data: any, actions) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(JSON.stringify(data));
    actions.resetForm();
});

const [ email, emailProps ] = form.defineField('email', {
    validateOnBlur       : true,
    validateOnChange     : true,
    validateOnInput      : true,
    validateOnModelUpdate: true,
});

const [ amount, amountProps ] = form.defineField('amount');
const [ rules, rulesProps ]   = form.defineField('rules');
const [ lang, langProps ]     = form.defineField('languages', {
    props () {
        return {
            name: 'lang',
        };
    },
});

</script>