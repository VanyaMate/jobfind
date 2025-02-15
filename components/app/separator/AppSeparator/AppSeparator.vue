<template>
    <div class="separator-container">
        <template v-for="(child, index) in ($slots.default?.() ?? [])" :key="index">
            <span v-if="index > 0" class="separator">-</span>
            <component :is="child"/>
        </template>
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
.separator-container {
    display     : flex;
    gap         : var(--offset-small);
    align-items : center;
}
</style>