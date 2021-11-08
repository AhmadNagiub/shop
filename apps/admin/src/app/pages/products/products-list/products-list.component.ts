import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ProductsService } from '@nagiub/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit , OnDestroy {

  products:Array<any> = [];
  endSubject$ :Subject<any> = new Subject()

  constructor( private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(){
    this.endSubject$.next();
    this.endSubject$.complete();
  }
  getProducts(){
    this.productsService.getProducts().pipe(takeUntil(this.endSubject$)).subscribe((products) =>{
      this.products = products;
    })
  }

  UpdateProduct(id:string){
    this.router.navigateByUrl(`products/form/${id}`)
    }
    
  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endSubject$)).subscribe(
          () => {
            this.getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }
}
