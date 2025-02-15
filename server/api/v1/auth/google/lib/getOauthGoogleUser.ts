export const getOauthGoogleUser = function (accessToken: string) {
    return $fetch<{
        email: string,
        picture: string,
    }>('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${ accessToken }`,
        },
    });
};