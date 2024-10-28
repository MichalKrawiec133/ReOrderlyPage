import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:5120/account'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<User> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.get<User>(this.apiUrl, { headers });
  }

  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.patch<User>(this.apiUrl, user, { headers });
  }

  deleteUser(): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.delete<void>(this.apiUrl, { headers });
  }

  deleteUserSubscriptions(userId: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.http.delete<void>(`${this.apiUrl}/${userId}/subscriptions`, { headers });
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    const body = {
      emailAddress: email,
      oldPassword: currentPassword,
      newPassword: newPassword
    };
//todo: nie działa zmiana hasła. bad request a w swaggerze działa. 
    return this.http.patch<any>(`${this.apiUrl}/changePassword`, body, { headers });
  }
}
