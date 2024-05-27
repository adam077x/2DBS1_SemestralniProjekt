import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users/prihlasit';

  constructor(private http: HttpClient) { }

  prihlasit(email: string, heslo: string) {
    const requestBody = { email, heslo };
    return this.http.post(this.apiUrl, requestBody);
  }
}
