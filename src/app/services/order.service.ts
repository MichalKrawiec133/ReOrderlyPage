import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:5120/orders';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Order[]>(this.ordersUrl, { headers });
  }
}
