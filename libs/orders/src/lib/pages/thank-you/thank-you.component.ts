import { Component, OnInit } from '@angular/core';
import {  OrdersService } from '../../services/orders.service';
import {  CartService } from '../../services/cart.service';

@Component({
  selector: 'nagiub-thank-you',
  templateUrl: './thank-you.component.html',
  styles: [
  ]
})
export class ThankYouComponent implements OnInit {

  constructor(private orederService:OrdersService , private cartService:CartService) { }

  ngOnInit(): void {
    const orderData = this.orederService.getCachedOrderData();
    this.orederService.createOrder(orderData).subscribe(()=>{
      this.cartService.emptyCart();
      this.orederService.RemoveCachedOrderData();
    })
  }



}
