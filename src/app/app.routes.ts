import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { AccountComponent } from './profil/account/account.component';
import { RegisterComponent } from './login/register/register.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path: '', redirectTo: '/produkty', pathMatch: 'full' }, 
    
    {path: 'login', component: LoginComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'konto', component: AccountComponent},
    {path: 'rejestracja', component: RegisterComponent},
    { path: 'produkty', component: ProductsComponent },

];
