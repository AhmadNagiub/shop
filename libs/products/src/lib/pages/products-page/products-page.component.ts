import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@nagiub/orders';
import { Subject } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'nagiub-products-page',
    templateUrl: './products-page.component.html',
    styles: []
})
export class ProductsPageComponent implements OnInit {
    constructor(private _productServices: ProductsService, private route: ActivatedRoute, private cartService: CartService) {}
    product!: Product;
    quantity = 1;
    endsubject$: Subject<any> = new Subject();
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getProductById(params.productid);
            }
        });
    }

    private _getProductById(id: string) {
        this._productServices.getProduct(id).subscribe((res) => {
            this.product = res;
        });
    }

    addProductToCart() {
      const cartItem: CartItem = {
        productId: this.product.id,
        quantity: this.quantity
      };
      this.cartService.setCartItem(cartItem);
    }
}
