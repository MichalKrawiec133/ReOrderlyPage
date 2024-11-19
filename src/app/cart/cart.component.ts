import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; 
import { CartProduct } from '../models/cart-product.model';
import { NgIf, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink,
    NgIf

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: CartProduct[] = [];

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}

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
  
  isCartItems():boolean{
    
    return !!this.items.length
    
  }

  goToOrderSummary(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/order-summary']);
    } else {
      
      this.authService.setLoginRedirect(0,true);
      this.router.navigate(['/login']); 
    }
  }

}
