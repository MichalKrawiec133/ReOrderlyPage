import { Component, OnInit } from '@angular/core';
import { BeginSubscriptionService } from '../services/begin-subscription.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderSubscriptionProducts } from '../models/order-subscription-products.model';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-begin-subscription',
  standalone: true,
  imports: [

    RouterLink,
    NgIf,
    CommonModule,
    FormsModule

  ],
  templateUrl: './begin-subscription.component.html',
  styleUrls: ['./begin-subscription.component.css']
})
export class BeginSubscriptionComponent implements OnInit {
  items: OrderSubscriptionProducts[] = [];
  quantities: number[] = []; 
  intervalDays: number = 1;
  orderDate: Date = new Date();

  constructor(private beginSubscriptionService: BeginSubscriptionService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.items = this.beginSubscriptionService.getItems(); 
  }

  increaseQuantity(item: OrderSubscriptionProducts): void {
    this.beginSubscriptionService.increaseQuantity(item); 
  }

  decreaseQuantity(item: OrderSubscriptionProducts): void {
    this.beginSubscriptionService.decreaseQuantity(item); 
  }

  removeFromSubscription(item: OrderSubscriptionProducts): void {
    this.beginSubscriptionService.removeFromSubscription(item);
    this.items = this.beginSubscriptionService.getItems(); 
  }

  clearSubscriptions(): void {
    this.beginSubscriptionService.clearSubscriptions(); 
    this.items = []; 
  }
  
  hasSubscriptions(): boolean {
    return !!this.items.length;
  }

  goToOrderSummary(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/order-summary']);
    } else {
      this.authService.setLoginRedirect(true);
      this.router.navigate(['/login']); 
    }
  }



  createOrderSubscription() {
    // const orderSubscriptionProducts: OrderSubscriptionProducts[] = this.items.map((item, index) => ({
    //   productId: item.productId,
    //   quantity: this.quantities[index] || 0 // Use the quantity from the array
    // }));

    // const orderSubscription = new OrderSubscription(
    //   0, // or any valid ID
    //   new User(), // Replace with actual user data
    //   this.intervalDays,
    //   this.orderDate,
    //   orderSubscriptionProducts
    // );

    // console.log(orderSubscription); // For demonstration purposes
    // You can now use orderSubscription as needed
  }


}


