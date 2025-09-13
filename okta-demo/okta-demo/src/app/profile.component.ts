 import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, JsonPipe], // ✅ Required for *ngIf and json pipe
  template: `
    <div *ngIf="user">
      <h3>User Profile</h3>
      <pre>{{ user | json }}</pre>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: Record<string, any> | null = null;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    try {
      this.user = await this.auth.getUser();
    } catch (error) {
      this.user = null;
      console.error('Failed to fetch user:', error);
    }
  }
}
