import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; 
import { CartProduct } from '../models/cart-product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [

    CommonModule

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: CartProduct[] = []; 

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems(); 
  }

  decreaseQuantity(item: CartProduct): void {
    if (item.quantityToAdd! > 1) {
        item.quantityToAdd!--;
        this.cartService.updateItemCount(); 
    }
}
  increaseQuantity(item: CartProduct): void {
    item.quantityToAdd!++; 
    this.cartService.updateItemCount(); 
  }

  removeFromCart(item: CartProduct): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1); 
      this.cartService.updateItemCount();
    }
  }
//TODO: Dodać przycisk zamówienia i zrobić komponent zamówienie. 
  clearCart(): void {
    this.cartService.clearCart(); 
    this.items = []; 
  }
}
