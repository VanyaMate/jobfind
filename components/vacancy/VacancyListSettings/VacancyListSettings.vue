<template>
    <div class="vacancy-list-settings">
        <div class="side">
            <AppSelect
                :options="[
                { label: 'Новые', value: 'DATE' },
                { label: 'Высокие зарплаты', value: 'DATE' },
                { label: 'Низкие зарплаты', value: 'DATE' },
            ]"
            />
            <AppSelect
                :options="[
                { label: 'За день', value: 'DATE' },
                { label: 'За 2 дня', value: 'DATE' },
                { label: 'За неделю', value: 'DATE' },
                { label: 'За месяц+', value: 'DATE' },
            ]"
            />
        </div>
        <div class="side">

        </div>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import AppSelect from '~/components/app/select/AppSelect/AppSelect.vue';
import type { FormContext } from 'vee-validate';
import type { VacancyFilter } from '~/types/vacancy/vacancy.filter';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    formContext: FormContext<VacancyFilter, VacancyFilter>;
}

const props                 = defineProps<Props>();
const [ title, titleAttrs ] = props.formContext.defineField('title');

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
        display     : flex;
        gap         : var(--offset-medium);
        align-items : center;
    }
}
</style>