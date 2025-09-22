// backend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/secure'; // Your Node.js endpoint

  constructor(private http: HttpClient) {}

  getSecureMessage(accessToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.get(this.apiUrl, { headers, responseType: 'text' });
  }
}
