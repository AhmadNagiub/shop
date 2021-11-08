import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  OrdersService } from '../../services/orders.service';
import {  CartService } from '../../services/cart.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nagiub-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit ,OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount:any = 0;
  endSubs$: Subject<any> = new Subject();
  quantity:any
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items?.length ?? 0;
      const items:any = respCart.items 
      items.forEach((cartItem:any) => {
        const id:any = cartItem.productId
        this.quantity = cartItem.quantity
        this.ordersService.getProduct(id).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event:any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }
}
