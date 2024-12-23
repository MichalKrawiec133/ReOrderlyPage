import { Injectable } from '@angular/core';
import { OrderSubscriptionProducts } from '../models/order-subscription-products.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionDataService {
  private subscriptionData: {
    items: OrderSubscriptionProducts[];
    orderDate: string;
    intervalDays: number;
  } | null = null;

  setSubscriptionData(data: { items: OrderSubscriptionProducts[]; orderDate: string; intervalDays: number }): void {
    this.subscriptionData = data;
    console.log(data)
  }

  getSubscriptionData(): { items: OrderSubscriptionProducts[]; orderDate: string; intervalDays: number } | null {
    return this.subscriptionData;
  }

  clearSubscriptionData(): void {
    this.subscriptionData = null;
  }
}
