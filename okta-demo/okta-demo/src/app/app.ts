import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { TokenDisplayComponent } from './token-display.component/token-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, TokenDisplayComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userName: string = 'User';
  showTokens = false;

  constructor(private auth: AuthService, private router: Router) {
    this.loadUserFromIdToken();
  }

  async loadUserFromIdToken() {
    const idToken = await this.auth.getIdToken();
    if (idToken) {
      const decoded: any = jwtDecode(idToken);
      this.userName = decoded.username || decoded.preferred_username || decoded.name || decoded.email || 'User';
    }
  }

  toggleTokens() {
    this.showTokens = !this.showTokens;
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}

import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});

