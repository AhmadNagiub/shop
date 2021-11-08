import { Component, OnInit } from '@angular/core';
import { CartService } from '@nagiub/orders';
@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private cartServices:CartService) { }

  ngOnInit(): void {
this.cartServices.initalCartLocalStorage();
  }

}
