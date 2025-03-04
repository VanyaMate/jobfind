import {
    nonValidDataResponse,
} from '~/server/responses/non-valid-data.response';
import {
    getFieldFormData,
    getStringFieldFormData,
} from '~/server/utils/getFieldFormData';
import { isUndefined } from '@vanyamate/types-kit';
import { getUserFromEvent } from '~/server/utils/getUserFromEvent';


export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const userId   = getUserFromEvent(event);

    if (!formData || !userId) {
        return nonValidDataResponse(event);
    }

    const title       = getStringFieldFormData(formData, 'title');
    const description = getStringFieldFormData(formData, 'description');
    const logo        = getFieldFormData(formData, 'logo');

    if (isUndefined(title) || isUndefined(description) || isUndefined(logo)) {
        return nonValidDataResponse(event);
    }

    let logoPath: string = '';
    const storage        = useStorage();
    if (logo.data && logo.filename) {
        logoPath = `company/logo/${ Date.now() }-${ logo.filename }`;
        await storage.setItem(logoPath, logo.data);
    }

    const fullLogoPath = logoPath ? `storage/${ logoPath }` : '';

    const company = await prisma.company.create({
        data: {
            title,
            description,
            logo: fullLogoPath,
        },
    });

    try {
        const connection = await prisma.companyToUser.create({
            data: {
                userId,
                companyId: company.id,
                rules    : 1,
            },
        });

        return company;
    } catch (e) {
        await prisma.company.delete({ where: { id: company.id } });
        await storage.removeItem(logoPath);
        throw new Error(`ошибка создания компании`);
    }
});