import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; 
import { CartProduct } from '../models/cart-product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink,

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

  increaseQuantity(item: CartProduct): void {
    this.cartService.increaseQuantity(item); 
  }

  decreaseQuantity(item: CartProduct): void {
    this.cartService.decreaseQuantity(item); 
  }

  removeFromCart(item: CartProduct): void {
    this.cartService.removeFromCart(item);
    this.items = this.cartService.getItems(); 
  }

  clearCart(): void {
    this.cartService.clearCart(); 
    this.items = []; 
  }
}
