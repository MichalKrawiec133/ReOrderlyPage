import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { OrderItems } from '../models/order-items.model';
@Component({
  selector: 'app-order-finalized',
  standalone: true,
  imports: [

    NgFor

  ],
  templateUrl: './order-finalized.component.html',
  styleUrl: './order-finalized.component.css'
})
export class OrderFinalizedComponent implements OnInit {
  orderItems: OrderItems[] = []; 
  totalAmount = 0; 

  constructor(private router: Router) {}
//TODO: NIE DZIAŁA POKAZANIE PODSUMOWANIA
  ngOnInit(): void {
    
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation && navigation.extras.state) {
      this.orderItems = navigation.extras.state['order_items'] || [];
      this.totalAmount = navigation.extras.state['total'] || 0; 
    }
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }
}
