import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService,ORDER_STATUS } from '@nagiub/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-order-form',
  templateUrl: './order-form.component.html',
  styles: [
  ]
})
export class OrderFormComponent implements OnInit , OnDestroy {

  order: Order | undefined;
  orderItems:any = [] || undefined;
  userOrdered:any = [] || undefined;
  orderStatuses:any;
  selectedStatus:any;
  id:any;
  endSubject$:Subject<any> = new Subject
  
  constructor( private _orderService:OrdersService , 
    private route:ActivatedRoute,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }
  ngOnDestroy(){ 
    this.endSubject$.next();
    this.endSubject$.complete();
  }

  _getOrder(){
    this.route.params.pipe(takeUntil(this.endSubject$)).subscribe(params =>{
      if(params.id){
        this._orderService.getOrder(params.id).pipe(takeUntil(this.endSubject$)).subscribe((order)=>{
          this.order = order
          this.id = order.id
          this.orderItems = order.orderItems;
          this.userOrdered = order.user;
          this.selectedStatus = order.status
        })
      }
    })
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }
  onStatusChange(event:any) {
    this._orderService.updateOrder({ status: event.value }, this.id).pipe(takeUntil(this.endSubject$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }


}

