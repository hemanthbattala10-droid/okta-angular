// auth.service.ts
import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { BehaviorSubject } from 'rxjs';
import { oktaAuthConfig } from './okta-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private oktaAuth = new OktaAuth(oktaAuthConfig);
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  constructor() {
    this.checkAuth(); // Initialize auth state
  }

  // 🔐 Redirect to Okta for login
  async login(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  // 🚪 Sign out and redirect to postLogoutRedirectUri
  async logout(): Promise<void> {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: oktaAuthConfig.postLogoutRedirectUri
    });
    this.authState.next(false); // Update state
  }

  // ✅ Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const isAuth = await this.oktaAuth.isAuthenticated();
    this.authState.next(isAuth);
    return isAuth;
  }

  // 👤 Get user profile from ID token
  getUser(): Promise<any> {
    return this.oktaAuth.getUser();
  }

  // 🧾 Get raw ID token (JWT string)
  async getIdToken(): Promise<string | undefined> {
    const tokens = await this.oktaAuth.tokenManager.getTokens();
    return tokens.idToken?.idToken;
  }

  // 🔑 Get raw Access token (JWT string)
  async getAccessToken(): Promise<string | undefined> {
    const tokens = await this.oktaAuth.tokenManager.getTokens();
    return tokens.accessToken?.accessToken;
  }

  // 🔄 Refresh auth state manually
  async checkAuth(): Promise<void> {
    const isAuth = await this.oktaAuth.isAuthenticated();
    this.authState.next(isAuth);
  }
}
