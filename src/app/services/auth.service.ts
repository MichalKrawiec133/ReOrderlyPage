import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap, BehaviorSubject, interval, Subscription } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service'; 
import { User } from '../models/user.model';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private apiUrl = 'http://localhost:5120'; 
  private loginRedirect: boolean[] = []; 
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();
  private intervalSubscription: Subscription = new Subscription;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: BrowserStorageService,
    
  ) {

    this.updateLoggedInStatus();

  }

  ngOnInit(): void {
    this.startTokenCheck();
  }

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
    if (!token){
      //console.log("!token")
      return false;
    } 
  
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) {
      console.log("b")
      return false;
    } 
  
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return payload.exp > currentTime; 
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storageService.setItem('authToken', response.token); 
          this.updateLoggedInStatus();
          this.startTokenCheck();
        }
      })
    );
  }

  logout(): void {
    //console.log("test")
    this.storageService.removeItem('authToken'); 
    this.updateLoggedInStatus();
    this.stopTokenCheck();
    this.router.navigate(['/']);
  }

  

  register(user: User): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}/account/register`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storageService.setItem('authToken', response.token); 
          this.updateLoggedInStatus();
        }
      })
    );
  }


  private updateLoggedInStatus(): void {
    const isLoggedIn = this.isLoggedIn();
    this.loggedInSubject.next(isLoggedIn); 
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


  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  startTokenCheck(): void {
    this.intervalSubscription = interval(15000).subscribe(() => {
      const wasLoggedIn = this.loggedInSubject.value;
      this.updateLoggedInStatus();
      const isTokenValid = this.isLoggedIn();
  
      if (!isTokenValid && wasLoggedIn) {
        //console.log("TokenCheck")
        this.handleExpiredToken(); 
      }
    });
  }
  
  private handleExpiredToken(): void {
      
      this.logout();
      alert('Twoja sesja wygasła. Zaloguj się ponownie.');
      this.router.navigate(['/login']);
    
  }
  

  stopTokenCheck(): void {
    this.intervalSubscription?.unsubscribe();
  }
}
