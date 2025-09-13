import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  template: `<button (click)="logout()">Logout</button>`
})
export class LogoutComponent {
  constructor(private auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}
