import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from '../models/cart-product.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartProduct[] = []; 
  private itemCountSubject = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCart(); 
  }

  addToCart(product: CartProduct): void {
    
    const existingProductIndex = this.items.findIndex(item => item.productId === product.productId);

    if (existingProductIndex !== -1) {
      this.items[existingProductIndex].quantityToAdd += product.quantityToAdd || 1; 
    } else {
      this.items.push(product);
    }

    this.updateLocalStorage();
    this.updateItemCount();
  }

  increaseQuantity(item: CartProduct): void {
    const existingProductIndex = this.items.findIndex(cartItem => cartItem.productId === item.productId);
    if (existingProductIndex !== -1) {
      this.items[existingProductIndex].quantityToAdd!++; 
      this.updateLocalStorage(); 
      this.updateItemCount(); 
    }
  }

  decreaseQuantity(item: CartProduct): void {
    const existingProductIndex = this.items.findIndex(cartItem => cartItem.productId === item.productId);
    if (existingProductIndex !== -1 && this.items[existingProductIndex].quantityToAdd! > 1) {
      this.items[existingProductIndex].quantityToAdd!--; 
      this.updateLocalStorage(); 
      this.updateItemCount();
    }
  }

  removeFromCart(item: CartProduct): void {
    const index = this.items.findIndex(cartItem => cartItem.productId === item.productId);
    if (index > -1) {
      this.items.splice(index, 1); 
      this.updateLocalStorage(); 
      this.updateItemCount();
    }
  }

  getItems(): CartProduct[] {
    return this.items; 
  }

  clearCart(): void {
    this.items = []; 
    this.itemCountSubject.next(0);
    localStorage.removeItem('cart');
  }

  getItemCount(): number {
    return this.items.length; 
  }
  
  updateItemCount(): void {
    const totalCount = this.items.reduce((total, item) => total + item.quantityToAdd!, 0);
    this.itemCountSubject.next(totalCount);
  }

  private updateLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      const cartJson = JSON.stringify(this.items);
      localStorage.setItem('cart', cartJson); 
    }
  }

  private loadCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      const cartJson = localStorage.getItem('cart');
      if (cartJson) {
        this.items = JSON.parse(cartJson);
        this.updateItemCount();
      }
    }
  }


}