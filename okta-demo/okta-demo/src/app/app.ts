import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { routes } from './app.routes';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isAuthenticated = false;
  userName = '';
  tokensVisible = false;
  idToken?: string;
  accessToken?: string;
  showLogoutMessage = false;

  constructor(
    private auth: AuthService,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
  let hasCheckedAuth = false;

  this.auth.authState$.subscribe(async (authStatus) => {
    this.isAuthenticated = authStatus;

    if (authStatus) {
      const idToken = await this.auth.getIdToken();
      const accessToken = await this.auth.getAccessToken();
      this.idToken = idToken || undefined;
      this.accessToken = accessToken || undefined;

      if (idToken) {
        const decoded: any = jwtDecode(idToken);
        this.userName =
          decoded.name ||
          decoded.preferred_username ||
          decoded.email ||
          decoded.sub ||
          'User';
      }

      this.showLogoutMessage = false;
    } else {
      this.idToken = undefined;
      this.accessToken = undefined;
      this.userName = '';
      this.tokensVisible = false;

      // Only show logout message if we've already checked auth once
      this.showLogoutMessage = hasCheckedAuth;
    }

    hasCheckedAuth = true;
    this.cd.detectChanges();
  });
}


  login() {
    this.auth.login(); // triggers Okta login redirect
  }

  async logout() {
    await this.auth.logout(); // revoke tokens and end session
    this.isAuthenticated = false;
    this.userName = '';
    this.idToken = undefined;
    this.accessToken = undefined;
    this.tokensVisible = false;
    this.showLogoutMessage = true;
    this.cd.detectChanges();
  }

  toggleTokens() {
    this.tokensVisible = !this.tokensVisible;
  }
}

import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});
