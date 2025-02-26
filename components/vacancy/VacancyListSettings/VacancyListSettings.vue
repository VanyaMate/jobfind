<template>
    <div class="vacancy-list-settings">
        <AppForm @submit.prevent @change="onFormChange" class="side">
            <AppSelect
                :options="[
                    { label: 'Новые', value: VacancySortType.CREATED_AT },
                    { label: 'Высокие зарплаты', value: VacancySortType.SALARY_GROSS },
                    { label: 'Низкие зарплаты', value: VacancySortType.SALARY_LESS },
                ]"
                v-model="sortType"
                v-bind="sortTypeAttrs"
            />
            <AppSelect
                :options="[
                    { label: 'За день', value: VacancyCreatedAtType.DAY },
                    { label: 'За 2 дня', value: VacancyCreatedAtType.TWO_DAY },
                    { label: 'За неделю', value: VacancyCreatedAtType.WEAK },
                    { label: 'За месяц +', value: VacancyCreatedAtType.MONTH },
                ]"
                v-model="createdAt"
                v-bind="createdAtAttrs"
            />
        </AppForm>
        <div class="side">

        </div>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppSelect from '~/components/app/select/AppSelect/AppSelect.vue';
import type { FormContext } from 'vee-validate';
import type { VacancyFilter } from '~/types/vacancy/vacancy.filter';
import { VacancyCreatedAtType, VacancySortType } from '~/types/vacancy/vacancy';
import AppForm from '~/components/app/forms/AppForm/AppForm.vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    formContext: FormContext<VacancyFilter, VacancyFilter>;
}

const props                         = defineProps<Props>();
const [ sortType, sortTypeAttrs ]   = props.formContext.defineField('sortBy');
const [ createdAt, createdAtAttrs ] = props.formContext.defineField('createdAt');
const route                         = useRoute();
const router                        = useRouter();
const setRoute                      = function (filter: VacancyFilter) {
    router.push({
        query: {
            ...route.query,
            sortType : filter.sortBy === VacancySortType.CREATED_AT ? undefined : filter.sortBy,
            createdAt: filter.createdAt === VacancyCreatedAtType.TWO_DAY ? undefined : filter.createdAt,
        },
    });
};
const onFormChange                  = props.formContext.handleSubmit(setRoute);

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.vacancy-list-settings {
    display         : flex;
    gap             : var(--offset-medium);
    justify-content : space-between;
    align-items     : center;

    .side {
        display        : flex;
        gap            : var(--offset-medium);
        align-items    : center;
        flex-direction : row;
    }
}
</style>