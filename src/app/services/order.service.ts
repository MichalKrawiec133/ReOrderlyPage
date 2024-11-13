import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';
import { OrderStatus } from '../models/order-status.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:5120';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Order[]>(`${this.ordersUrl}/orders`, { headers });
  }

  placeOrder(order: Order): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.ordersUrl}/checkout`, order, { headers });
  }

  getStatus(): Observable<OrderStatus[]>{

    return this.http.get<OrderStatus[]>(`${this.ordersUrl}/getStatus`);

  }
}
