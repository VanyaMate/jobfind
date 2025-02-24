<template>
    <AppForm>
        <h4>Зарплата</h4>
        <AppTopLabel>
            <template v-slot:label>
                От
            </template>
            <template v-slot:input>
                <AppInput placeholder="10000" v-model="salary"/>
            </template>
        </AppTopLabel>
        <AppSelect
            :options="[
                { label: 'Рубли', value: SalaryCurrency.RUB },
                { label: 'Доллары', value: SalaryCurrency.USD },
                { label: 'Евро', value: SalaryCurrency.EUR },
            ]"
            v-model="salaryType"
        />
        <AppCheckbox v-model="salaryAfterTax">После вычета налогов</AppCheckbox>
        <AppCheckbox v-model="salaryExist">Зарплата указана</AppCheckbox>
        <h4>Теги</h4>
        <AppInput placeholder="react,typescript" v-model="tags" name="tags"/>
        <h4>Исключить слова</h4>
        <AppInput placeholder="vue,angular" v-model="excludeWords" name="excludeWords"/>
        <h4>Опыт работы</h4>
        <AppRadio :value="0" v-model="experience" name="experience">Без опыта</AppRadio>
        <AppRadio :value="1" v-model="experience" name="experience">1+ год</AppRadio>
        <AppRadio :value="2" v-model="experience" name="experience">2+ года</AppRadio>
        <AppRadio :value="3" v-model="experience" name="experience">3+ года</AppRadio>
        <AppRadio :value="4" v-model="experience" name="experience">4+ года</AppRadio>
        <AppRadio :value="5" v-model="experience" name="experience">5+ лет</AppRadio>
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
import { useDebounce } from '~/hooks/useDebounce';
import { isArray } from '@vanyamate/types-kit';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props          = defineProps<Props>();
const debounce       = useDebounce(500);
const route          = useRoute();
const router         = useRouter();
const salary         = ref(route.query.salary as string ?? '');
const salaryType     = ref(route.query.salaryType as SalaryCurrency ?? SalaryCurrency.RUB);
const salaryAfterTax = ref(!!route.query.salaryAfterTax);
const salaryExist    = ref(!!route.query.salaryExist);
const tags           = ref(
    isArray(route.query.tags)
    ? route.query.tags.join(',')
    : (route.query.tags ?? ''),
);
const excludeWords   = ref(
    isArray(route.query.excludeWords)
    ? route.query.excludeWords.join(',')
    : (route.query.excludeWords ?? ''),
);
const experience     = ref(route.query.experience ? parseInt(route.query.experience as string) : 0);

watch([
    salary,
    salaryType,
    salaryAfterTax,
    salaryExist,
    tags,
    excludeWords,
    experience,
], ([
        _salary,
        _salaryType,
        _salaryAfterTax,
        _salaryExist,
        _tags,
        _excludeWords,
        _experience,
    ]) => {
    debounce(() => {
        router.push({
            query: {
                ...route.query,
                salary        : _salary || undefined,
                salaryType    : _salaryType || undefined,
                salaryAfterTax: _salaryAfterTax ? 'true' : undefined,
                salaryExist   : _salaryExist ? 'true' : undefined,
                tags          : _tags.length ? _tags.split(',') : undefined,
                excludeWords  : _excludeWords.length ? _excludeWords.split(',') : undefined,
                experience    : _experience || undefined,
            },
        });
    });
});

defineOptions({
    inheritAttrs: true,
});
</script>

<style scoped>

</style>