import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderSubscription } from '../models/order-subscription.model'; 
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionsUrl = 'http://localhost:5120/subscriptions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSubscriptions(): Observable<OrderSubscription[]> {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get<OrderSubscription[]>(this.subscriptionsUrl, { headers });
  }

  cancel(orderSubscriptionId: number): Observable<void> {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    console.log(this.subscriptionsUrl + "/" + orderSubscriptionId);
    return this.http.delete<void>(this.subscriptionsUrl + "/" + orderSubscriptionId, { headers });
}

}
