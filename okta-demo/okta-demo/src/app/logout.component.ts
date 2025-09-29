import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <div *ngIf="authState$ | async; else loggedOut">
      <button (click)="logout()">Logout</button>
    </div>

    <ng-template #loggedOut>
      <h2>🎉 Congrats, you're logged out successfully!</h2>
      <p>You’ve been securely signed out of your session.</p>
      <button routerLink="/">Return to Home</button>
      <button routerLink="/login">Login Again</button>
    </ng-template>
  `,
  imports: [NgIf, AsyncPipe]
})
export class LogoutComponent {
  authState$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {
    this.authState$ = this.auth.authState$;
  }

  async logout() {
    try {
      await this.auth.logout(); // Redirects back to this component
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
