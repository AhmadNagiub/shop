import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {OrdersService, Order ,ORDER_STATUS} from '@nagiub/orders';
import {ConfirmationService , MessageService} from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit , OnDestroy {

  orders:Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubject$ :Subject<any> = new Subject()

  constructor(private _OrdersService:OrdersService ,private _conf:ConfirmationService,
    private messageService: MessageService ,private _router:Router) { }

  ngOnInit(): void {
    this.getAll();
  }
  ngOnDestroy(){
    this.endSubject$.next();
    this.endSubject$.complete();
  }

getAll(){
  this._OrdersService.getOrders().pipe(takeUntil(this.endSubject$)).subscribe(order =>{
    this.orders = order
  })
}

deleteOrder(orderId: string) {
  this._conf.confirm({
    message: 'Do you want to Delete this Category?',
    header: 'Delete Category',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this._OrdersService.deleteOrder(orderId).pipe(takeUntil(this.endSubject$)).subscribe(
        () => {
          this.getAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is deleted!'
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not deleted!'
          });
        }
      );
    }
  });
}

showOrders(id:string){
this._router.navigateByUrl(`orders/${id}`)

}



}
