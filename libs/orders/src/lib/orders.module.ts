import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard, UsersModule } from '@nagiub/users';

export const ordersRoutes: Route[] = [
    {path:'cart' , component:CartPageComponent},
    {
        path: 'checkout',
        component: CheckoutPageComponent,
        canActivate:[AuthGuard]
    },
    {
    path: 'success',
    component: ThankYouComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ordersRoutes), BadgeModule,ButtonModule,InputTextModule,
        InputMaskModule,DropdownModule, FormsModule,
        ReactiveFormsModule,InputNumberModule ,UsersModule],
    exports:[CartIconComponent, CartPageComponent, CheckoutPageComponent, ThankYouComponent, OrderSummaryComponent],
    declarations: [CartIconComponent, CartPageComponent, CheckoutPageComponent, ThankYouComponent, OrderSummaryComponent]
})

export class OrdersModule {}
