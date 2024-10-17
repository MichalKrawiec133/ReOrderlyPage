import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgModel } from '@angular/forms';
import { ProfilBarComponent } from './profil-bar/profil-bar.component';
import { OrdersComponent } from './orders/orders.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    ProfilBarComponent,
    OrdersComponent,
    NgIf
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
