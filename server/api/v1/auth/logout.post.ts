import { getValidResponse } from '~/server/lib/getValidResponse';


export default defineEventHandler((event) => {
    deleteCookie(event, 'access-token');
    deleteCookie(event, 'refresh-token');
    deleteCookie(event, 'user-data');

    return getValidResponse(true);
});