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
  private loginRedirect: boolean[] = []; 
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: BrowserStorageService 
  ) {}


  setLoginRedirect(id:number,value: boolean) {
    this.loginRedirect[id] = value;
  }

  getLoginRedirect(): boolean[] {
    return this.loginRedirect;
  }

  clearLoginRedirect(id:number) {
    this.loginRedirect[id] = false;
  }

  isLoggedIn(): boolean {
    const token = this.storageService.getItem('authToken');
    //console.log(new Date());
    //console.log(token)
    //console.log(!!token)
    return !!token; 
}

//TODO: jak wygaśnie token to się robią problemy z przyciskami bo strona się w sumie nie odświeża więc navbar itp nie wiedzą ze przycisk wygasł.
//była proba zrobienia interceptora ale mnostwo z tym problemow bylo wiec nie ma. 
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
    //console.log("test")
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
