import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'; // 👈 Required for *ngIf and ngIfElse
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-token-display',
  standalone: true, // 👈 Ensure this is marked standalone
  templateUrl: './token-display.component.html',
  styleUrls: ['./token-display.component.css'],
  imports: [NgIf] // 👈 Add NgIf to enable structural directives
})
export class TokenDisplayComponent implements OnInit {
  idToken?: string;
  accessToken?: string;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.idToken = await this.auth.getIdToken();
    this.accessToken = await this.auth.getAccessToken();
  }
}
