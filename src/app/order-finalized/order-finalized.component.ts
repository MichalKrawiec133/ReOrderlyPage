import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { OrderItems } from '../models/order-items.model';
import { OrderDataService } from '../services/order-data.service';

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

  constructor(private router: Router, private orderDataService: OrderDataService) {}
  ngOnInit(): void {
    
    const data = this.orderDataService.getOrderData();
  this.orderItems = data.items;
  this.totalAmount = data.total;

  // wyczyszczenie zeby po odswiezeniu strony nie byly te dane widoczne. 
  //this.orderDataService.clearOrderData();
  
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }
}
