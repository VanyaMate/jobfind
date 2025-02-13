export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.client) return;

    const authToken = useCookie('access-token');

    if (!authToken.value && to.path !== '/login') {
        return navigateTo('/login');
    }

    // validate / update authToken
    // get user by authToken
    // continue

    if (authToken.value && to.path === '/login') {
        return navigateTo('/');
    }
});