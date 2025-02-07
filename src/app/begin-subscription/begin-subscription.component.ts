import { Component, OnInit } from '@angular/core';
import { BeginSubscriptionService } from '../services/begin-subscription.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderSubscriptionProducts } from '../models/order-subscription-products.model';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderSubscription } from '../models/order-subscription.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { UserService } from '../services/user.service';
import { SubscriptionDataService } from '../services/subscription-data.service';

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
 
  intervalDays: number = 1;
  orderDate: string = "";

  constructor(
    private beginSubscriptionService: BeginSubscriptionService,
    private authService: AuthService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private userService: UserService,
    private subscriptionDataService: SubscriptionDataService 
  ) {}


  ngOnInit(): void {
    this.items = this.beginSubscriptionService.getItems(); 
    this.orderDate = new Date().toISOString().split('T')[0];
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


  createOrderSubscription() {
    // czy są produkty
    if (this.items.length === 0) {
      alert('Brak produktów do subskrypacji'); 
      return;
    }
  
    // confirm dialog data
    const dialogData = {
      title: 'Potwierdzenie utworzenia subskrypcji',
      message: 'Czy na pewno chcesz utworzyć subskrypcję?'
    };
  
    // open confirm dialog
    this.confirmDialogService.openConfirmDialog(dialogData).subscribe(result => {
      if (result) {
        // czy jest zalogowany
        if (!this.authService.isLoggedIn()) {
          this.authService.setLoginRedirect(1, true);
          this.router.navigate(['/login']); 
        } else {
          // pobierz dane użytkownika
          this.userService.getUser().subscribe(user => {
            if (user) {
              
              // mapowanie ordersubcriptionproducts
              const orderSubscriptionProducts: OrderSubscriptionProducts[] = this.items.map((item) => ({
                orderSubscriptionProductId: item.orderSubscriptionProductId,
                products: item.products,
                productQuantity: item.productQuantity 
              }));
  
              // nowa subskrypcja
              const orderSubscription = new OrderSubscription(
                0, 
                user, 
                this.intervalDays,
                this.orderDate,
                orderSubscriptionProducts
              );

              console.log(orderSubscription)
              this.beginSubscriptionService.placeOrder(orderSubscription).subscribe(
                response => {
                  this.subscriptionDataService.setSubscriptionData({
                    items: orderSubscriptionProducts,
                    orderDate: this.orderDate,
                    intervalDays: this.intervalDays
                  });
                  this.clearSubscriptions();
                  this.router.navigate(['/subscription-finalized']);
                },
                error => {
                  console.error('Error placing order:', error);
                  alert('Wystąpił błąd podczas składania subskrypcji. Spróbuj ponownie.');
                }
              );
            }
          }, error => {
            console.error('Błąd pobierania danych użytkownika:', error);
            throw new Error('Błąd pobierania danych użytkownika.');
          });
        }
      } else {
        console.log('Subskrypcja anulowana');
      }
    });
  }


}


