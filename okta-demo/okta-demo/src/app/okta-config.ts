import { environment } from '../environments/environment';
import { OktaAuthOptions } from '@okta/okta-auth-js';

export const oktaAuthConfig: OktaAuthOptions = {
  clientId: environment.okta.clientId,
  issuer: environment.okta.issuer,
  redirectUri: environment.okta.redirectUri,
  postLogoutRedirectUri: 'https://effective-space-winner-4j95j69566qqfj99v-4200.app.github.dev/login',
  scopes: environment.okta.scopes,
  pkce: environment.okta.pkce
};
