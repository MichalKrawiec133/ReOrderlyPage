import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service'; 
import { OrderSubscription } from '../../models/order-subscription.model'; 
import { NgIf,NgFor, CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [
    NgIf, 
    NgFor,
    CommonModule,
    FormsModule
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})

export class SubscriptionsComponent implements OnInit {
  subscriptions: OrderSubscription[] = [];
  errorMessage: string | null = null;
  editingStates: { [key: number]: { isEditing: boolean, editingProducts: { [key: number]: boolean } } } = {};

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
    
      }
    );
  }

  isEditing(subscriptionId: number): boolean {
    return this.editingStates[subscriptionId]?.isEditing || false;
  }

  isProductEditing(subscriptionId: number, productId: number): boolean {
    return this.editingStates[subscriptionId]?.editingProducts[productId] || false;
  }

  onEdit(item: any, subscription: OrderSubscription): void {
    this.confirmDialogService.openConfirmDialog({
      title: 'Potwierdzenie edycji',
      message: 'Czy na pewno chcesz edytować tę subskrypcję?'
    }).subscribe(result => {
      if (result) {

        if (!this.editingStates[subscription.orderSubscriptionId]) {
          this.editingStates[subscription.orderSubscriptionId] = {
            isEditing: false,
            editingProducts: {}
          };
        }
  
        this.editingStates[subscription.orderSubscriptionId].isEditing = true;
        this.editingStates[subscription.orderSubscriptionId].editingProducts[item.products.productId] = true;
      }
    });
  }

  onConfirmChanges(subscription: OrderSubscription): void {
    this.subscriptionService.update(subscription).subscribe(
      (updatedSubscription) => {

        this.subscriptionService.update(subscription);

        this.disableEditing(subscription.orderSubscriptionId); 
      },
      (error) => {
        
      }
    );
  }
  
  disableEditing(orderSubscriptionId: number): void {
    this.editingStates[orderSubscriptionId].isEditing = false;
  }

  // onCancel(orderSubscriptionId: number): void {
  //   this.confirmDialogService.openConfirmDialog({
  //     title: 'Potwierdzenie anulowania',
  //     message: 'Czy na pewno chcesz anulować tę subskrypcję?'
  //   }).subscribe(result => {
  //     if (result) {
  //       this.subscriptionService.cancel(orderSubscriptionId).subscribe(() => {
  //         this.subscriptions = this.subscriptions.filter(subscription => subscription.orderSubscriptionId !== orderSubscriptionId);
  //       });
  //     }
  //   });
  // }
  onCancelSubscription(orderSubscriptionId: number): void {
    this.confirmDialogService.openConfirmDialog({
      title: 'Potwierdzenie anulowania subskrypcji',
      message: 'Czy na pewno chcesz anulować tę subskrypcję?'
    }).subscribe(result => {
          if (result) {
            this.subscriptionService.cancel(orderSubscriptionId).subscribe(() => {
              this.subscriptions = this.subscriptions.filter(subscription => subscription.orderSubscriptionId !== orderSubscriptionId);
            });
          }
        });
      }

      onCancelProduct(product: Product, orderSubscriptionId: number): void {
        this.confirmDialogService.openConfirmDialog({
          title: 'Potwierdzenie anulowania produktu',
          message: 'Czy na pewno chcesz usunąć ten produkt z subskrypcji?'
        }).subscribe(result => {
          if (result) {
            this.subscriptionService.cancelProduct(orderSubscriptionId, product.productId).subscribe(
              () => {
                const subscription = this.subscriptions.find(sub => sub.orderSubscriptionId === orderSubscriptionId);
                if (subscription) {
                  subscription.orderSubscriptionProducts = subscription.orderSubscriptionProducts.filter(item => item.orderSubscriptionProductId !== product.productId);
                }
              },
              (error) => {
                console.error('Błąd podczas usuwania produktu', error);
              }
            );
          }
        });
    }
    
  
}

