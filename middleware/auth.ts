export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.client) return;

    const authToken = useCookie('access-token');

    if (!authToken.value && to.path !== '/login') {
        return navigateTo('/login');
    }

    if (authToken.value && to.path === '/login') {
        return navigateTo('/');
    }
});