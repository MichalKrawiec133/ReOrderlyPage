import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../models/cart-product.model';
import { CommonModule } from '@angular/common';
import { Order } from '../models/order.model';
import { OrderItems } from '../models/order-items.model';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';
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
  itemsProduct: Product[]=[];
  constructor(private cartService: CartService, private orderService: OrderItems, private authService: AuthService,) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems(); 
    this.calculateTotal(); 
  }

  calculateTotal(): void {
    this.totalAmount = this.items.reduce((total, item) => total + (item.productPrice * item.quantityToAdd), 0);
    this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  }
  
  placeOrder(): void {
    this.itemsProduct = this.items.map(item => ({
      productId: item.productId,
      productName: item.productName, 
      productPrice: item.productPrice,
      quantityToAdd: item.quantityToAdd,
      productQuantity: item.productQuantity,
      imagePath: item.imagePath
    }));

    const orderItems: OrderItems[] = this.items.map(item => {
      
      const product = this.itemsProduct.find(p => p.productId === item.productId);

      if (!product) {
          throw new Error(`Produkt nieznaleziony`);
      }

      return new OrderItems(
          0, 
          item.productId,
          product, 
          0, 
          item.quantityToAdd,
          item.productPrice
      );
    });
    var userId = this.authService.getCurrentUserId();

    if (!userId) {
      throw new Error(`Id użytkownika nieznaleziono`);
    }
    
    const order: Order = {
      orderId: 0, 
      idUser: userId, 
      orderDate: new Date(), 
      orderStatus: { orderStatusId: 1 }, 
      orderItems: orderItems
    };

    
    this.orderService.placeOrder(order).subscribe(
      response => {
        console.log(response);
        alert('Dziękujemy za zamówienie!'); 
        this.cartService.clearCart(); // Wyczyść koszyk po złożeniu zamówienia
        this.router.navigate(['/order-confirmation']); // Przekierowanie do strony potwierdzenia
      },
      error => {
        console.error('Error placing order:', error);
        alert('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
      }
    );
  }
}


