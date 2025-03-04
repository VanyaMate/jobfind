import { getUserFromEvent } from '~/server/utils/getUserFromEvent';
import {
    nonValidDataResponse,
} from '~/server/responses/non-valid-data.response';


export default defineEventHandler(async (event) => {
    const userId = getUserFromEvent(event);

    console.log('INDEX.GET', userId);

    if (userId) {
        return prisma.company.findMany({
            where: { companyToUser: { some: { userId } } },
        });
    }

    return nonValidDataResponse(event);
});