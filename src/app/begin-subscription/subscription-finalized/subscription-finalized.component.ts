import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderSubscriptionProducts } from '../../models/order-subscription-products.model';
import { SubscriptionDataService } from '../../services/subscription-data.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-subscription-finalized',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './subscription-finalized.component.html',
  styleUrls: ['./subscription-finalized.component.css']
})
export class SubscriptionFinalizedComponent implements OnInit {
  items: OrderSubscriptionProducts[] = [];
  orderDate: string = '';
  intervalDays: number = 0;

  constructor(private router: Router, private subscriptionDataService: SubscriptionDataService) {}

  ngOnInit(): void {
    // Pobieranie danych z serwisu
    const data = this.subscriptionDataService.getSubscriptionData();
    console.log("finalized", data)
    if (data) {
      this.items = data.items;
      this.orderDate = data.orderDate;
      this.intervalDays = data.intervalDays;
    
    } else {
      
      this.router.navigate(['/']);
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profil']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
