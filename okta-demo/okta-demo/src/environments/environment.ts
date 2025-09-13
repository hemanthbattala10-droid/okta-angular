export const environment = {
  production: false,
  okta: {
    clientId: '0oajfu7rpj65M2FAh697',
    issuer: 'https://demo-azure-marsupial-56101.okta.com/oauth2/ausjfu4hbumYKoFdA697',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  }
};
