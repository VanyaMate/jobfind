import type { Store } from '@vanyamate/sec-vue';
import { useStore } from '@vanyamate/sec-vue';


export const useCookieAsStore = function <StoreData> (store: Store<StoreData>, cookieName: string) {
    const cookie     = useCookie<StoreData>(cookieName);
    const storeValue = useStore(store);

    if (cookie) {
        storeValue.value = cookie.value;
    }

    return storeValue;
};