import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { AccountComponent } from './profil/account/account.component';
import { RegisterComponent } from './login/register/register.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart-and-order/cart/cart.component';
import { OrderSummaryComponent } from './cart-and-order/order-summary/order-summary.component';
import { OrderFinalizedComponent } from './cart-and-order/order-finalized/order-finalized.component';
import { BeginSubscriptionComponent } from './begin-subscription/begin-subscription.component';
import { authGuard } from './guard/auth.guard';
import { SubscriptionFinalizedComponent } from './begin-subscription/subscription-finalized/subscription-finalized.component';

export const routes: Routes = [
    { path: '', redirectTo: '/produkty', pathMatch: 'full' }, 
    
    { path: 'login', component: LoginComponent },
    { path: 'profil', component: ProfilComponent, canActivate:[authGuard] },
    { path: 'konto', component: AccountComponent, canActivate:[authGuard] },
    { path: 'rejestracja', component: RegisterComponent },
    { path: 'produkty', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order-summary', component: OrderSummaryComponent, canActivate:[authGuard] }, 
    { path: 'order-finalized', component: OrderFinalizedComponent, canActivate:[authGuard]},
    { path: 'begin-subscription', component: BeginSubscriptionComponent},
    { path: 'subscription-finalized', component: SubscriptionFinalizedComponent},
    { path: '**', component: ProductsComponent }

];
