/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

const CART_KEY = "cart"
@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  // here i use behaviorsubject instead of subject because initalcart if i initate it in constructor it won't get me the updated cartcount

  // constructor() { }

  getCart(): Cart {
    const cartJsonString : any = localStorage.getItem(CART_KEY) 
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  initalCartLocalStorage(){   
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: []
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, intialCartJson);
    }

  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          const count:any = cartItem.quantity
          if (updateCartItem) {
            item.quantity =count;
          } else {
            item.quantity = item.quantity + count ;
          }
        }
        return item;
      });
    } else {
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart:any = this.getCart();
    const newCart = cart.items.filter((item:any) => {
      return item.productId !== productId;
    });

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }


  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
}

