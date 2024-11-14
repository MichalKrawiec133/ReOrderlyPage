import { Injectable } from '@angular/core';
import { OrderItems } from '../models/order-items.model';
@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private orderItems: OrderItems[] = [];
  private totalAmount: number = 0;

  setOrderData(items: OrderItems[], total: number) {
    this.orderItems = items;
    this.totalAmount = total;
  }

  getOrderData() {
    return { items: this.orderItems, total: this.totalAmount };
  }

  clearOrderData() {
    this.orderItems = [];
    this.totalAmount = 0;
  }
}
