import { Injectable } from '@angular/core';
import { OktaAuth, TokenManager } from '@okta/okta-auth-js';
import { oktaAuthConfig } from './okta-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private oktaAuth = new OktaAuth(oktaAuthConfig);

  async login(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.oktaAuth.isAuthenticated();
  }

  getUser(): Promise<any> {
    return this.oktaAuth.getUser();
  }
}
