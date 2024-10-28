import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Login } from '../../models/login.model';
import { ChangePassword } from '../../models/change-password.model';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgIf,
    FormsModule

  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  user: User;
  errorMessage: string | null = null;
  isEditing: boolean = false;
  showChangePasswordForm: boolean = false; 
  login: Login = new Login('', ''); 
  currentPassword: string = ''; 
  confirmNewPassword: string = '';
  changePasswordModel: ChangePassword;

  constructor(
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.user = {
      userId: 0,
      name: '',
      lastName: '',
      streetName: '',
      houseNumber: 0,
      voivodeship: '',
      country: '',
      zipcode: 0,
      emailAddress: '',
      password: '',
      phoneNumber: 0
    };
    this.changePasswordModel = new ChangePassword('', '', '');
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        this.errorMessage = 'Błąd podczas ładowania danych użytkownika!';
        console.error(error);
      }
    );
}

  onEdit(): void {
    this.confirmDialogService.openConfirmDialog({
      title: 'Potwierdzenie edycji',
      message: 'Czy na pewno chcesz edytować swoje dane?'
    }).subscribe(result => {
      if (result) {
        this.isEditing = true; 
      }
    });
  }

  onUpdate(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(
        () => {
          alert('Dane użytkownika zostały zaktualizowane.');
          this.isEditing = false;
        },
        (error) => {
          console.error('Błąd podczas aktualizacji danych użytkownika', error);
        }
      );
    }
  }

  onDeleteAccount(): void {
    this.confirmDialogService.openConfirmDialog({
      title: 'Potwierdzenie usunięcia konta',
      message: 'Czy na pewno chcesz usunąć swoje konto?'
    }).subscribe(result => {
      if (result && this.user) {
        const userId = this.user.userId;

        
        this.userService.deleteUserSubscriptions(userId).subscribe(() => {
          
          this.userService.deleteUser().subscribe(() => {
            alert('Konto zostało usunięte.');
            // todo: dodac przekierowanie do glownej strony.
          });
        });
      }
    });
  }

  onChangePassword(): void {
    if (this.login.emailAddress && this.currentPassword && this.login.password) {
      
      const changePasswordData = new ChangePassword(this.login.emailAddress, this.currentPassword, this.login.password);
      
      this.userService.changePassword(changePasswordData.emailAddress, changePasswordData.oldPassword, changePasswordData.newPassword).subscribe(
        () => {
          alert('Hasło zostało zmienione.');
          
          this.login = new Login('', '');
          this.currentPassword = '';
          this.showChangePasswordForm = false; 
        },
        (error) => {
          console.error('Błąd podczas zmiany hasła', error);
          alert('Nie udało się zmienić hasła. Sprawdź swoje dane.');
        }
      );
    } else {
      alert('Wszystkie pola muszą być wypełnione.');
    }
  }
}


  