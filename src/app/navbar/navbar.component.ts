import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; 
  itemCount: number = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    //this.isLoggedIn = this.authService.isLoggedIn();
    this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count; 
    });
  }

  updateCartCount(): void {
    this.itemCount = this.cartService.getItemCount(); 
  }

  checkLoginForm(): boolean {
    return this.authService.isLoggedIn(); 
  }

  checkLogin(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      
      this.router.navigate(['/']);
    }
  }
}
