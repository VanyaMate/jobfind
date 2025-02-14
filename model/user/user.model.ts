import { store, effect } from '@vanyamate/sec-vue';


export const updateLogin = async function (previousLogin: string) {
    return previousLogin + '-1';
};

export const updateLoginEffect = effect(updateLogin);

export const getCurrentUser = function () {
    if (import.meta.browser) {
        const cookie = document.cookie;
        const items  = cookie.split('; ');
        for (let i = 0, item = null, name = '', content = ''; i < items.length; i++) {
            item              = items[i];
            [ name, content ] = item.split('=');
            if (name === 'user-data') {
                return JSON.parse(decodeURIComponent(content));
            }
        }
        return items.find((item) => item.split('=')[0] === 'user-data');
    }

    return null;
};

export const userModel = store<{ login: string } | null>(getCurrentUser())
    .on(updateLoginEffect, 'onSuccess', (state, { result }) => {
        if (state.value?.login) {
            state.value.login = result!;
        }
    });