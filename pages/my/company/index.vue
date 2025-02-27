<template>
    <div class="index-container">
        company-page

        // Страница с выбором компании, а дальше уже будет и выбор отделов и вакансии и настройки что угодно
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.index-container {

}
</style>