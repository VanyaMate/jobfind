import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';


export const getUserFromEvent = function (event: H3Event): string | null {
    const authToken = getCookie(event, 'access-token');
    console.log('auth token', authToken);

    if (authToken) {
        try {
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY!) as {
                id: string
            };
            console.log(decoded);
            return decoded.id;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    return null;
};