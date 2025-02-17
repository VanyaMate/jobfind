export default defineEventHandler((event) => {
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/auth');

    googleAuthUrl.searchParams.append('client_id', process.env.GOOGLE_OAUTH_CLIENT_ID!);
    googleAuthUrl.searchParams.append('redirect_uri', `${ process.env.URL }/api/v1/auth/google/callback`);
    googleAuthUrl.searchParams.append('response_type', 'code');
    googleAuthUrl.searchParams.append('scope', 'openid email profile');
    googleAuthUrl.searchParams.append('access_type', 'offline');

    return sendRedirect(event, googleAuthUrl.toString());
});