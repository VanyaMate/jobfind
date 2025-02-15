import { EventHandlerRequest, H3Event } from 'h3';


export const getJsonFromEvent = async function <Data> (event: H3Event<EventHandlerRequest>): Promise<Data | null> {
    try {
        const body = await readBody(event);
        return JSON.parse(body) as Data;
    } catch (_) {
        return null;
    }
};