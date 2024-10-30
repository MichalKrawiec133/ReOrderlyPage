import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  checkLoginForm(): boolean {
    return this.isLoggedIn; 
  }

  checkLogin(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.isLoggedIn = false; 
      this.router.navigate(['/']);
    }
  }
}
