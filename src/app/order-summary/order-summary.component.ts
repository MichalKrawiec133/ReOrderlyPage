import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../models/cart-product.model';
import { CommonModule } from '@angular/common';
import { Order } from '../models/order.model';
import { OrderItems } from '../models/order-items.model';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product.model';
import { AuthService } from '../services/auth.service';
import { OrderStatus } from '../models/order-status.model';
import { Router } from '@angular/router';

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
  orderStatuses: OrderStatus[] = [];

  constructor(private cartService: CartService, private router: Router, private orderService: OrderService, private authService: AuthService,) {}

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
      alert('Koszyk jest pusty'); 
      return;
    }

    this.itemsProduct = this.items.map(item => ({
      productId: item.productId,
      productName: item.productName, 
      productPrice: item.productPrice,
      quantityToAdd: item.quantityToAdd,
      productQuantity: item.productQuantity,
      imagePath: item.imagePath
    }));

    const orderItemsGet: OrderItems[] = this.items.map(item => {
      
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
          item.productPrice*item.quantityToAdd
      );
    });

    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      throw new Error(`Id użytkownika nieznaleziono`);
    }
    

    //logika składania zamówienia jest wykonywana po otrzymaniu statusów z bazy danych. 
    this.orderService.getStatus().subscribe(
        (statuses: OrderStatus[]) => {
            this.orderStatuses = statuses; 

            if (this.orderStatuses.length === 0) {
                alert('Nie można złożyć zamówienia. Statusy zamówienia są niedostępne.');
                return;
            }

            // tworzenie zamówienia
            const order: Order = {
                orderId: 0, 
                idUser: userId, 
                idOrderStatus: this.orderStatuses[0].orderStatusId,
                orderDate: new Date(), 
                orderStatus: this.orderStatuses[0], 
                orderItems: orderItemsGet
            };

            // kontakt z backendem
            this.orderService.placeOrder(order).subscribe(
                response => {
                    console.log(response);
                    alert('Dziękujemy za zamówienie!'); 
                    var total = this.calculateTotal();
                    var order_items = orderItemsGet
                    this.cartService.clearCart(); 
                    this.router.navigate(['/order-finalized'], { state: { order_items, total } });
                },
                error => {
                    console.error('Error placing order:', error);
                    alert('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
                }
            );

        },
        error => {
            console.error('Error fetching order statuses:', error);
            alert('Wystąpił błąd podczas pobierania statusów zamówienia.');
        }
    );

  }
}


