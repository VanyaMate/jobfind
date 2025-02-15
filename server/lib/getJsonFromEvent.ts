import { EventHandlerRequest, H3Event } from 'h3';
import { isObject } from '@vanyamate/types-kit';


export const getJsonFromEvent = async function <Data> (event: H3Event<EventHandlerRequest>): Promise<Data | null> {
    try {
        const body = await readBody(event);

        if (isObject(body)) {
            return body;
        }

        return JSON.parse(body) as Data;
    } catch (_) {
        return null;
    }
};