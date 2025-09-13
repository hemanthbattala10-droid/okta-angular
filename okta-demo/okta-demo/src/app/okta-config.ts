import { environment } from '../environments/environment';
import { OktaAuthOptions } from '@okta/okta-auth-js';

export const oktaAuthConfig: OktaAuthOptions = {
  clientId: environment.okta.clientId,
  issuer: environment.okta.issuer,
  redirectUri: environment.okta.redirectUri,
  scopes: environment.okta.scopes,
  pkce: environment.okta.pkce
};
