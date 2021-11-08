import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CartService } from '@nagiub/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  constructor(private messageService:MessageService , private cartService:CartService , private route:Router) { }




  ngOnInit(): void {

    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.route.url.includes('checkout') ? 'Order is pinned' : 'Cart Updated!'
      });
    });
  }

}
