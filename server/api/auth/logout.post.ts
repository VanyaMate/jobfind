export default defineEventHandler((event) => {
    deleteCookie(event, 'access-token');
    return {
        success: true,
    };
});