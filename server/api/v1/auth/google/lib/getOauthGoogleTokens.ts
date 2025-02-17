export const getOauthGoogleTokens = function (code: string) {
    return $fetch<{
        access_token: string
    }>('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body  : {
            client_id    : process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            code,
            grant_type   : 'authorization_code',
            redirect_uri : `${ process.env.URL }/api/v1/auth/google/callback`,
        },
    });
};