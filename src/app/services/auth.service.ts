import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service'; 
import { User } from '../models/user.model';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5120'; 
  private loginRedirect: boolean =false; 
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: BrowserStorageService 
  ) {}


  setLoginRedirect(value: boolean) {
    this.loginRedirect = value;
  }

  getLoginRedirect(): boolean {
    return this.loginRedirect;
  }

  clearLoginRedirect() {
    this.loginRedirect = false;
  }

  isLoggedIn(): boolean {
    const token = this.storageService.getItem('authToken');
    return !!token; 
}

//TODO: jak wygaśnie token to się robią problemy z przyciskami bo strona się w sumie nie odświeża więc navbar itp nie wiedzą ze przycisk wygasł. 
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

  
  register(user: User): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/account/register`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storageService.setItem('authToken', response.token); 
        }
      })
    );
  }

  getCurrentUserId(): number | null {
    const token = this.storageService.getItem('authToken');
    if (!token) return null;

    try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.UserId ? Number(decodedToken.UserId) : null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
  }

}
