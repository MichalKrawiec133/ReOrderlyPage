import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5120'; 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // sprawdzanie czy jest zalogowany
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      
      return !!localStorage.getItem('authToken');
    }
    return false; 
  }

  // Metoda do logowania
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        //TOKEN JWT POBIERANY Z API
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  // Metoda do wylogowania
  logout(): void {
    localStorage.removeItem('authToken');
    
  }
}