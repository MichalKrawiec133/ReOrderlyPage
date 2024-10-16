import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: User = new User('', '');
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    //event.preventDefault(); prawdopodobnie trzeba bedzie wprowadzic bo sie strona odswieza?
    this.authService.login(this.loginData).subscribe(
      response => {
        // zalogowano
        this.router.navigate(['/profil']);
      },
      error => {
        // blad logowania
        this.errorMessage = 'Błędne dane logowania!';
      }
    );
  }
}