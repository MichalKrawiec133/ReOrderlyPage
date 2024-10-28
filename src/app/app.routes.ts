import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { AccountComponent } from './profil/account/account.component';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'konto', component: AccountComponent}

];
