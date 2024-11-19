import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderSubscriptionProducts } from '../models/order-subscription-products.model'; // Upewnij się, że ścieżka jest poprawna
import { isPlatformBrowser } from '@angular/common';
import { OrderSubscription } from '../models/order-subscription.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BeginSubscriptionService {
  private items: OrderSubscriptionProducts[] = []; 
  private itemCountSubject = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();
  private ordersUrl = 'http://localhost:5120';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    this.loadSubscriptions(); 
  }

  addToSubscription(product: OrderSubscriptionProducts): void {
    const existingProductIndex = this.items.findIndex(item => item.products.productId === product.products.productId);

    if (existingProductIndex !== -1) {
      this.items[existingProductIndex].productQuantity += product.productQuantity || 1; 
    } else {
      this.items.push(product);
    }

    this.updateLocalStorage();
    this.updateItemCount();
  }

  increaseQuantity(product: OrderSubscriptionProducts): void {
    const existingProductIndex = this.items.findIndex(item => item.products.productId === product.products.productId);

    if (existingProductIndex !== -1) {
      this.items[existingProductIndex].productQuantity++; 
      this.updateLocalStorage(); 
      this.updateItemCount(); 
    }
  }

  decreaseQuantity(product: OrderSubscriptionProducts): void {
    const existingProductIndex = this.items.findIndex(item => item.products.productId === product.products.productId);
    if (existingProductIndex !== -1 && this.items[existingProductIndex].productQuantity > 1) {
      this.items[existingProductIndex].productQuantity--; 
      this.updateLocalStorage(); 
      this.updateItemCount();
    }
  }

  removeFromSubscription(product: OrderSubscriptionProducts): void {
    const existingProductIndex = this.items.findIndex(item => item.products.productId === product.products.productId);
    if (existingProductIndex > -1) {
      this.items.splice(existingProductIndex, 1); 
      this.updateLocalStorage(); 
      this.updateItemCount();
    }
  }

  getItems(): OrderSubscriptionProducts[] {
    return this.items; 
  }

  clearSubscriptions(): void {
    this.items = []; 
    this.itemCountSubject.next(0);
    localStorage.removeItem('subscriptions');
  }

  getItemCount(): number {
    return this.items.length; 
  }
  
  updateItemCount(): void {
    const totalCount = this.items.reduce((total, item) => total + item.productQuantity, 0);
    this.itemCountSubject.next(totalCount);
  }

  private updateLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const subscriptionsJson = JSON.stringify(this.items);
      localStorage.setItem('subscriptions', subscriptionsJson); 
    }
  }

  private loadSubscriptions(): void {
    if (isPlatformBrowser(this.platformId)) {
      const subscriptionsJson = localStorage.getItem('subscriptions');
      if (subscriptionsJson) {
        this.items = JSON.parse(subscriptionsJson);
        this.updateItemCount();
      }
    }
  }

  placeOrder(orderSubscription: OrderSubscription): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.ordersUrl}/subscribe`, orderSubscription, { headers });
  }
}
