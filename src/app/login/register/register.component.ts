import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User; // Użytkownik
  errorMessage: string | null = null;

  constructor(private userService: UserService) {
    this.user = new User;
    //todo: poprawic usera
  }

  onRegister(): void {
    this.userService.register(this.user).subscribe(
      () => {
        alert('Rejestracja zakończona sukcesem!');
      },
      (error) => {
        console.error('Błąd podczas rejestracji', error);
        this.errorMessage = error.error || 'Wystąpił błąd podczas rejestracji.';
      }
    );
  }
}

