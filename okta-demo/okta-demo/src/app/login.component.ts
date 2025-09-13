import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `<button (click)="login()">Login with Okta</button>`
})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  login() {
    this.auth.login();
  }
}
