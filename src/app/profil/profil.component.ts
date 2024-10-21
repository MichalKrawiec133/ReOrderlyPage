import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfilBarComponent } from './profil-bar/profil-bar.component';
import { OrdersComponent } from './orders/orders.component';
import { NgIf } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    ProfilBarComponent,
    OrdersComponent,
    NgIf,
    SubscriptionsComponent
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
