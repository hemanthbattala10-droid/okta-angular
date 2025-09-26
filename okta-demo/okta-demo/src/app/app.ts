import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
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
  userName = false;
  tokensVisible = false;
  idToken?: string;
  accessToken?: string;
  showLogoutMessage = false;
  currentUrl = '';

  constructor(
    private auth: AuthService,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.cd.detectChanges();
      }
    });

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
            '';
        }

        this.showLogoutMessage = false;
      } else {
        this.idToken = undefined;
        this.accessToken = undefined;
        //this.userName = '';
        this.tokensVisible = false;
        this.showLogoutMessage = hasCheckedAuth;
      }

      hasCheckedAuth = true;
      this.cd.detectChanges();
    });
  }

  login() {
    this.auth.login();
  }

  async logout() {
    await this.auth.logout();
    this.isAuthenticated = false;
    //this.userName = '';
    this.idToken = undefined;
    this.accessToken = undefined;
    this.tokensVisible = false;
    this.showLogoutMessage = true;
    //this.router.navigate(['/']);
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
