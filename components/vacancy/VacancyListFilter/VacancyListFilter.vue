<template>
    <AppForm>
        <h4>Зарплата</h4>
        <AppTopLabel>
            <template v-slot:label>
                От
            </template>
            <template v-slot:input>
                <AppInput placeholder="10000"/>
            </template>
        </AppTopLabel>
        <AppSelect
            :options="[
                { label: 'Рубли', value: SalaryCurrency.RUB },
                { label: 'Доллары', value: SalaryCurrency.USD },
                { label: 'Евро', value: SalaryCurrency.EUR },
            ]"
            :value="SalaryCurrency.RUB"
        />
        <AppCheckbox>После вычета налогов</AppCheckbox>
        <AppCheckbox>Зарплата указана</AppCheckbox>
        <h4>Теги</h4>
        <AppInput placeholder="react,typescript"/>
        <h4>Исключить слова</h4>
        <AppInput placeholder="vue,angular"/>
        <h4>Опыт работы</h4>
        <AppRadio :value="0">Без опыта</AppRadio>
        <AppRadio :value="1">1+ год</AppRadio>
        <AppRadio :value="2">2+ года</AppRadio>
        <AppRadio :value="3">3+ года</AppRadio>
        <AppRadio :value="4">4+ года</AppRadio>
        <AppRadio :value="5">5+ лет</AppRadio>
        <h4>Тип занятости</h4>
        <AppCheckbox>Удаленно</AppCheckbox>
        <AppCheckbox>В офисе</AppCheckbox>
        <h4>Образование</h4>
        <AppCheckbox>Не важно</AppCheckbox>
        <AppCheckbox>Высшее специальное</AppCheckbox>
        <AppCheckbox>Среднее специальное</AppCheckbox>
        <h4>График работы</h4>
        <AppCheckbox>Свободный</AppCheckbox>
        <AppCheckbox>5/2</AppCheckbox>
        <AppCheckbox>2/2</AppCheckbox>
        <AppCheckbox>Вахта</AppCheckbox>
    </AppForm>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppCheckbox from '~/components/app/inputs/AppCheckbox/AppCheckbox.vue';
import AppSelect from '~/components/app/select/AppSelect/AppSelect.vue';
import { SalaryCurrency } from '~/types/vacancy/vacancy';
import AppRadio from '~/components/app/inputs/AppRadio/AppRadio.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: true,
});
</script>

<style scoped>

</style>