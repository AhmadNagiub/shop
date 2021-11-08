import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@nagiub/orders';
import { Product } from '../../models/product';

@Component({
  selector: 'nagiub-product-item',
  templateUrl: './product-item.component.html',

})
export class ProductItemComponent  {

  @Input()
  product: Product = new Product;

  constructor(private cartService:CartService) { }



  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }

}
