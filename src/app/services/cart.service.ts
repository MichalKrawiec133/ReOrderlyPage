import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from '../models/cart-product.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartProduct[] = []; 
  private itemCountSubject = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();

  addToCart(product: CartProduct): void {
    
    const existingProductIndex = this.items.findIndex(item => item.productId === product.productId);

    if (existingProductIndex !== -1) {
      this.items[existingProductIndex].quantityToAdd += product.quantityToAdd || 1; 
    } else {
      this.items.push(product);
    }


    this.updateItemCount();
  }

  getItems(): CartProduct[] {
    return this.items; 
  }

  clearCart(): void {
    this.items = []; 
    this.itemCountSubject.next(0);
  }
  getItemCount(): number {
    return this.items.length; 
  }
  updateItemCount(): void {
    const totalCount = this.items.reduce((total, item) => total + item.quantityToAdd!, 0);
    this.itemCountSubject.next(totalCount);
  }
}