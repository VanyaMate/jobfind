<template>
    <AppForm @change="onSubmit" @input="onSubmit" @submit.prevent="onSubmit">
        <h4>Зарплата</h4>
        <AppTopLabel>
            <template v-slot:label>
                От
            </template>
            <template v-slot:input>
                <AppInput placeholder="10000" type="number" v-model="salaryMin" v-bind="salaryMinAttrs"/>
            </template>
        </AppTopLabel>
        <AppSelect
            :options="[
                { label: 'Рубли', value: SalaryCurrency.RUB },
                { label: 'Доллары', value: SalaryCurrency.USD },
                { label: 'Евро', value: SalaryCurrency.EUR },
            ]"
            v-model="salaryType"
            v-bind="salaryTypeAttrs"
        />
        <AppCheckbox v-model="salaryAfterTax" v-bind="salaryAfterTaxAttrs">После вычета налогов</AppCheckbox>
        <AppCheckbox v-model="salaryExist" v-bind="salaryExistAttrs">Зарплата указана</AppCheckbox>
        <h4>Ключевые слова</h4>
        <AppInput placeholder="react,typescript" name="tags" v-model="tags" v-bind="tagsAttrs"/>
        <h4>Исключить слова</h4>
        <AppInput placeholder="vue,angular" name="excludeWords" v-model="excludeWords" v-bind="excludeWordsAttrs"/>
        <h4>Опыт работы</h4>
        <AppRadio :value="0" name="experience" v-model="experience" v-bind="experienceAttrs">Без опыта</AppRadio>
        <AppRadio :value="1" name="experience" v-model="experience" v-bind="experienceAttrs">От 1 год</AppRadio>
        <AppRadio :value="2" name="experience" v-model="experience" v-bind="experienceAttrs">От 2 лет</AppRadio>
        <AppRadio :value="3" name="experience" v-model="experience" v-bind="experienceAttrs">От 3 лет</AppRadio>
        <AppRadio :value="4" name="experience" v-model="experience" v-bind="experienceAttrs">От 4 лет</AppRadio>
        <AppRadio :value="5" name="experience" v-model="experience" v-bind="experienceAttrs">От 5 лет</AppRadio>
        <h4>Место работы</h4>
        <AppCheckbox :value="VacancyFormat.REMOTE" v-model="format" v-bind="formatAttrs">Удаленно
        </AppCheckbox>
        <AppCheckbox :value="VacancyFormat.OFFICE" v-model="format" v-bind="formatAttrs">В офисе
        </AppCheckbox>
        <h4>Тип занятости</h4>
        <AppCheckbox
            :value="VacancyTypeOfEmployment.FULL_TIME"
            v-model="typeOfEmployment"
            v-bind="typeOfEmploymentAttrs"
        >
            Полный день
        </AppCheckbox>
        <AppCheckbox
            :value="VacancyTypeOfEmployment.PART_TIME"
            v-model="typeOfEmployment"
            v-bind="typeOfEmploymentAttrs"
        >
            Частичная
            занятость
        </AppCheckbox>
        <AppCheckbox
            :value="VacancyTypeOfEmployment.PROJECT"
            v-model="typeOfEmployment"
            v-bind="typeOfEmploymentAttrs"
        >
            Проектная работа
        </AppCheckbox>
        <AppCheckbox
            :value="VacancyTypeOfEmployment.INDIVIDUAL"
            v-model="typeOfEmployment"
            v-bind="typeOfEmploymentAttrs"
        >
            Самозанятный
        </AppCheckbox>
        <AppCheckbox
            :value="VacancyTypeOfEmployment.AGREEMENT"
            v-model="typeOfEmployment"
            v-bind="typeOfEmploymentAttrs"
        >
            Договор
        </AppCheckbox>
        <AppCheckbox
            :value="VacancyTypeOfEmployment.VOLUNTEER"
            v-model="typeOfEmployment"
            v-bind="typeOfEmploymentAttrs"
        >
            Волонтерство
        </AppCheckbox>
        <h4>Образование</h4>
        <AppCheckbox :value="VacancyEducationType.NONE" name="education" v-model="education" v-bind="educationAttrs">Не
            важно
        </AppCheckbox>
        <AppCheckbox :value="VacancyEducationType.HIGHER" name="education" v-model="education" v-bind="educationAttrs">
            Высшее специальное
        </AppCheckbox>
        <AppCheckbox :value="VacancyEducationType.SECONDARY" name="education" v-model="education"
                     v-bind="educationAttrs">Среднее специальное
        </AppCheckbox>
        <h4>График работы</h4>
        <AppCheckbox value="0" name="scheduleType" v-model="scheduleTypes" v-bind="scheduleTypesAttrs">Свободный
        </AppCheckbox>
        <AppCheckbox value="5/2" name="scheduleType" v-model="scheduleTypes" v-bind="scheduleTypesAttrs">5/2
        </AppCheckbox>
        <AppCheckbox value="2/2" name="scheduleType" v-model="scheduleTypes" v-bind="scheduleTypesAttrs">2/2
        </AppCheckbox>
        <AppCheckbox value="30" name="scheduleType" v-model="scheduleTypes" v-bind="scheduleTypesAttrs">Вахта
        </AppCheckbox>
        <AppButton>Применить</AppButton>
    </AppForm>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import AppCheckbox from '~/components/app/inputs/AppCheckbox/AppCheckbox.vue';
import AppSelect from '~/components/app/select/AppSelect/AppSelect.vue';
import { SalaryCurrency, VacancyEducationType, VacancyFormat, VacancyTypeOfEmployment } from '~/types/vacancy/vacancy';
import AppRadio from '~/components/app/inputs/AppRadio/AppRadio.vue';
import { useDebounce } from '~/hooks/useDebounce';
import { type FormContext } from 'vee-validate';
import type { VacancyFilter } from '~/types/vacancy/vacancy.filter';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { getUnselectedArray, getUnselectedEnum } from '~/lib/enum/getUnselectedEnum';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    formContext: FormContext<VacancyFilter, VacancyFilter>;
}

const props    = defineProps<Props>();
const debounce = useDebounce(500);
const route    = useRoute();
const router   = useRouter();

const setRoute = function (filterOptions: VacancyFilter) {
    debounce(() => {
        router.push({
            query: {
                ...route.query,
                salary                 : filterOptions.salaryMin || undefined,
                salaryType             : (filterOptions.salaryType === SalaryCurrency.RUB) ? undefined
                                                                                           : filterOptions.salaryType,
                salaryAfterTax         : (filterOptions.salaryAfterTax && 'true') || undefined,
                salaryExist            : (filterOptions.salaryExist && 'true') || undefined,
                tags                   : filterOptions.tags || undefined,
                excludeWords           : filterOptions.excludeWords || undefined,
                experience             : filterOptions.experienceFrom || undefined,
                excludeFormat          : getUnselectedEnum(VacancyFormat, filterOptions.format ?? []).join(',') || undefined,
                excludeTypeOfEmployment: getUnselectedEnum(VacancyTypeOfEmployment, filterOptions.typeOfEmployment ?? []).join(',') || undefined,
                excludeEducation       : getUnselectedEnum(VacancyEducationType, filterOptions.education ?? []).join(',') || undefined,
                excludeScheduleTypes   : getUnselectedArray([ '0', '5/2', '2/2', '30' ], filterOptions.scheduleTypes ?? []).join(',') || undefined,
            },
        });
    });
};

const [ salaryMin, salaryMinAttrs ]               = props.formContext.defineField('salaryMin');
const [ salaryType, salaryTypeAttrs ]             = props.formContext.defineField('salaryType');
const [ salaryAfterTax, salaryAfterTaxAttrs ]     = props.formContext.defineField('salaryAfterTax');
const [ salaryExist, salaryExistAttrs ]           = props.formContext.defineField('salaryExist');
const [ tags, tagsAttrs ]                         = props.formContext.defineField('tags');
const [ excludeWords, excludeWordsAttrs ]         = props.formContext.defineField('excludeWords');
const [ experience, experienceAttrs ]             = props.formContext.defineField('experienceFrom');
const [ typeOfEmployment, typeOfEmploymentAttrs ] = props.formContext.defineField('typeOfEmployment');
const [ format, formatAttrs ]                     = props.formContext.defineField('format');
const [ education, educationAttrs ]               = props.formContext.defineField('education');
const [ scheduleTypes, scheduleTypesAttrs ]       = props.formContext.defineField('scheduleTypes');

const onSubmit = props.formContext.handleSubmit(setRoute);

defineOptions({
    inheritAttrs: true,
});
</script>

<style scoped>

</style>