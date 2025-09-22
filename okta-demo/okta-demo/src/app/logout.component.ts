import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <button *ngIf="authState$ | async" (click)="logout()">Logout</button>
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
      await this.auth.logout();
      this.router.navigate(['/login']); // Redirect immediately after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
