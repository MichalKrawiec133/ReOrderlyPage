import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service'; 
import { OrderSubscription } from '../../models/order-subscription.model'; 
import { NgIf,NgFor, CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

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

  constructor(
    private subscriptionService: SubscriptionService,
    private confirmDialogService: ConfirmDialogService 
  ) {}

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

  onCancel(orderSubscriptionId: number): void {
    this.confirmDialogService.openConfirmDialog({
      title: 'Potwierdzenie anulowania',
      message: 'Czy na pewno chcesz anulować tę subskrypcję?'
    }).subscribe(result => {
      if (result) {
        console.log(`Anulowanie subskrypcji o ID: ${orderSubscriptionId}`);
        this.subscriptionService.cancel(orderSubscriptionId).subscribe(
          () => {
            this.subscriptions = this.subscriptions.filter(subscription => subscription.orderSubscriptionId !== orderSubscriptionId);
            console.log(`Subskrypcja o ID ${orderSubscriptionId} została anulowana.`);
          },
          (error) => {
            console.error('Błąd podczas anulowania subskrypcji:', error);
          }
        );
      }
    });
  }


  onEdit(subscription: OrderSubscription): void {
    // Logika edytowania subskrypcji
    console.log(`Edycja subskrypcji o ID: ${subscription.orderSubscriptionId}`);
    // Tutaj możesz dodać kod do edytowania subskrypcji, np. otwierając formularz z danymi
  }

}

