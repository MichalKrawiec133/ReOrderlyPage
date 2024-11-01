import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../models/cart-product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [

    CommonModule

  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  items: CartProduct[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems(); 
    this.calculateTotal(); 
  }

  calculateTotal(): void {
    this.totalAmount = this.items.reduce((total, item) => total + (item.productPrice * item.quantityToAdd), 0);
    this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  }
  
  placeOrder(): void {
    if (this.items.length === 0) {
      alert('Koszyk jest pusty!'); 
      return;
    }

    
    //TODO: dodac logike zamowienia - przerzucic do orderservice 
    // Możesz tutaj dodać logikę do wysyłania zamówienia do serwera lub przekierowania do strony potwierdzenia

    // Na przykład:
    // this.router.navigate(['/order-confirmation']); // Jeśli masz routing do strony potwierdzenia

    
    this.cartService.clearCart();
    alert('Dziękujemy za zamówienie!'); 
  }
}


