import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'okta-angular';
  public isAuthenticated = false;
  public idToken?: string;
  public accessToken?: string;
  public tokensVisible = false;

  constructor(
    public oktaAuth: OktaAuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.oktaAuth.$authenticationState.subscribe(async (isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        const tokens = await this.oktaAuth.getTokens();
        this.idToken = tokens.idToken?.idToken;
        this.accessToken = tokens.accessToken?.accessToken;

        // Optional: redirect to profile after login
        if (this.router.url === '/' || this.router.url === '/login') {
          this.router.navigate(['/profile']);
        }
      } else {
        this.idToken = undefined;
        this.accessToken = undefined;
        this.tokensVisible = false;
      }

      this.cd.detectChanges(); // Ensures UI updates correctly
    });
  }

  public login(): void {
    this.oktaAuth.loginRedirect();
  }
public logout(): void {
  this.oktaAuth.logout('/logged-out');
}

  
  //public logout(): void {
    //this.oktaAuth.logout('/');
  //}

  public toggleTokens(): void {
    this.tokensVisible = !this.tokensVisible;
  }

  public isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url.startsWith('/login');
  }
}
