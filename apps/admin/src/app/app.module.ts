import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderFormComponent } from './pages/orders/order-form/order-form.component';
import {ConfirmationService, MessageService} from 'primeng/api';


import { JwtInterceptor, UsersModule } from '@nagiub/users';

import { AppRoutingModule } from './app-routing.module';
import { UxModule } from './UX.modul';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UserListComponent, UserFormComponent, OrderListComponent, OrderFormComponent],
    imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        UsersModule,
        AppRoutingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot('pk_test_51JpghzCNPRXsLW6uKUnUQloG9yM1lfSFrokcmn4qtFc7MPG03rBfguNlSU9vvepG78NspvMuPcF6qzf6snqtS9qv00ljNVpjdp'),
        UxModule
    ],
    providers: [MessageService , ConfirmationService,
    {provide:HTTP_INTERCEPTORS , useClass:JwtInterceptor , multi:true}
],
    bootstrap: [AppComponent]
})
export class AppModule {}
