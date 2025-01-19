import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [

    NgIf,
    FormsModule,
    CommonModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User; 
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {

    this.user = new User(0, '', '', '', '', 0);
    
  }

  onRegister(): void {
    this.authService.register(this.user).subscribe(
      () => {

        alert('Rejestracja zakończona sukcesem!');
        this.router.navigate(['/profil']);
      },
      (error) => {
        
        this.errorMessage = 'Dane są błędne';
      }
    );
  }
}

