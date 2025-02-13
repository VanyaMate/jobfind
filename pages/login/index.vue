<template>
    <AuthorizationForm/>
</template>
<script setup lang="ts">
import AuthorizationForm from '~/components/authorization/AuthorizationForm/AuthorizationForm.vue';


definePageMeta({
    middleware: [ 'auth' ],
});
</script>