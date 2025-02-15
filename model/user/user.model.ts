import { store, effect } from '@vanyamate/sec-vue';
import type { User } from '~/types/user/user';
import { loginAction } from '~/actions/auth/login.action';
import { logoutAction } from '~/actions/auth/logout.action';
import { registrationAction } from '~/actions/auth/registration.action';


export const loginEffect        = effect(loginAction);
export const registrationEffect = effect(registrationAction);
export const logoutEffect       = effect(logoutAction);

export const authPendingModel = store<boolean>(false)
    .on(loginEffect, 'onBefore', (state) => state.value = true)
    .on(loginEffect, 'onFinally', (state) => state.value = false)
    .on(registrationEffect, 'onBefore', (state) => state.value = true)
    .on(registrationEffect, 'onFinally', (state) => state.value = false)
    .on(logoutEffect, 'onBefore', (state) => state.value = true)
    .on(logoutEffect, 'onFinally', (state) => state.value = false);

export const userModel = store<User | null>(null)
    .on(loginEffect, 'onSuccess', (state, { result }) => {
        state.value = result!;
    })
    .on(registrationEffect, 'onSuccess', (state, { result }) => {
        state.value = result!;
    })
    .on(logoutEffect, 'onSuccess', (state) => {
        state.value = null;
    });