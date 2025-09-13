export const environment = {
  production: true,
  okta: {
    clientId: 'YOUR_OKTA_CLIENT_ID',
    issuer: 'https://YOUR_OKTA_DOMAIN/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  }
};
