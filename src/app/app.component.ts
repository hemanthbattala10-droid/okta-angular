import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'okta-angular';
  isAuthenticated = false;
  idToken?: string;
  accessToken?: string;
  tokensVisible = false;

  constructor(private oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(async (isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        const tokens = await this.oktaAuth.getTokens();
        this.idToken = tokens.idToken?.idToken;
        this.accessToken = tokens.accessToken?.accessToken;
      } else {
        this.idToken = undefined;
        this.accessToken = undefined;
        this.tokensVisible = false;
      }
    });
  }

  login() {
    this.oktaAuth.loginRedirect();
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  toggleTokens() {
    this.tokensVisible = !this.tokensVisible;
  }
}
