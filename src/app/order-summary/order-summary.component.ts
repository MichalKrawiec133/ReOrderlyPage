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
  }
}

