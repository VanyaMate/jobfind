<template>
    <div class="page-container">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: true,
});
</script>

<style scoped>
.page-container {
    padding-top : calc(var(--all-input-height-large) + var(--offset-medium));
}
</style>