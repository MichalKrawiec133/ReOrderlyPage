import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5120'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: BrowserStorageService 
  ) {}

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('authToken');
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storageService.setItem('authToken', response.token); 
        }
      })
    );
  }

  logout(): void {
    this.storageService.removeItem('authToken'); 
    this.router.navigate(['/']);
  }
}
