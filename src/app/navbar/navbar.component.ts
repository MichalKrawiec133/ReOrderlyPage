import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { error } from 'console';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [

    NgIf

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  checkLoginForm(): boolean{

    return this.authService.isLoggedIn();

  }

  checkLogin(): void {
    if (this.authService.isLoggedIn()) {
      
      this.router.navigate(['/profil']);
    } else {
      
      this.router.navigate(['/login']);
    }
  }

  logout(): void{

    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/']);
    } 
  }

}
