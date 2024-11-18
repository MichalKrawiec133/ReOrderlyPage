import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { AccountComponent } from './profil/account/account.component';
import { RegisterComponent } from './login/register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderFinalizedComponent } from './order-finalized/order-finalized.component';
import { BeginSubscriptionComponent } from './begin-subscription/begin-subscription.component';

export const routes: Routes = [
    { path: '', redirectTo: '/produkty', pathMatch: 'full' }, 
    
    { path: 'login', component: LoginComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'konto', component: AccountComponent },
    { path: 'rejestracja', component: RegisterComponent },
    { path: 'produkty', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order-summary', component: OrderSummaryComponent }, 
    { path: 'order-finalized', component: OrderFinalizedComponent},
    { path: 'begin-subscription', component: BeginSubscriptionComponent}

];
