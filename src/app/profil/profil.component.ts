import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfilBarComponent } from './profil-bar/profil-bar.component';
import { OrdersComponent } from './orders/orders.component';
import { NgIf } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    
    NgIf,

    OrdersComponent,
    ProfilBarComponent,
    SubscriptionsComponent,
    AccountComponent
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})

export class ProfilComponent {
  
  currentSection: string = 'orders';

  switchSection(section: string) {
    this.currentSection = section;
  }
}
