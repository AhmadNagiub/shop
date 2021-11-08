import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {UiModule} from '@nagiub/ui';
import {ProductsModule} from '@nagiub/products';
import { OrdersModule} from '@nagiub/orders';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageComponent } from './shared/message/message.component';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JwtInterceptor } from '@nagiub/users';
import { NgxStripeModule } from 'ngx-stripe';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

const routes :Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home' , component:HomePageComponent},
  {path:'contact' , component:ContactUsComponent}
]


@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessageComponent, ContactUsComponent],
  imports: [BrowserModule ,
    RouterModule.forRoot(routes),
    UiModule,
    OrdersModule,
    AccordionModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ProductsModule,
    NgxStripeModule.forRoot('pk_test_51JpghzCNPRXsLW6uKUnUQloG9yM1lfSFrokcmn4qtFc7MPG03rBfguNlSU9vvepG78NspvMuPcF6qzf6snqtS9qv00ljNVpjdp'),
    HttpClientModule,
    ToastModule
  ],
  providers: [MessageService,
    {provide:HTTP_INTERCEPTORS , useClass:JwtInterceptor , multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  // constructor(private cart:CartService){
  //   cart.initalCartLocalStorage();
  // }
}
