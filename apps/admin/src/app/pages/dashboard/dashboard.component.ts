import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@nagiub/orders';
import { ProductsService } from '@nagiub/products';
import { UsersService } from '@nagiub/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit , OnDestroy {

  statistics:Array<number> = [];
  endSubject$ :Subject<any> = new Subject()  

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}
  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endSubject$)).subscribe((values) => {
      this.statistics = values;
    });
  }
  
  ngOnDestroy(){ 
    this.endSubject$.next();
    this.endSubject$.complete();
  }


}
