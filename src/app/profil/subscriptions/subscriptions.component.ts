import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service'; 
import { OrderSubscription } from '../../models/order-subscription.model'; 
import { NgIf,NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    NgIf, 
    NgFor,
    CommonModule
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})

export class SubscriptionsComponent implements OnInit {
  subscriptions: OrderSubscription[] = [];
  errorMessage: string | null = null;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (data: OrderSubscription[]) => {
        this.subscriptions = data;
      },
      (error) => {
        this.errorMessage = 'Błąd podczas ładowania subskrypcji!';
        console.error('Error fetching subscriptions', error);
      }
    );
  }
}

