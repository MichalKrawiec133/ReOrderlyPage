import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { Login } from '../models/login.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    FormsModule,
    NgIf,
    RouterLink
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: Login = new Login('', '');
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {

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