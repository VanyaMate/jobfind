export const logoutAction = async function (): Promise<boolean> {
    return fetch('/api/v1/auth/logout', {
        method     : 'POST',
        credentials: 'same-origin',
    })
        .then((response) => response.json());
};