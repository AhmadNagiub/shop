/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';
import { map, switchMap } from 'rxjs/operators';
// import { OrderItem } from '@nagiub/orders';  // it is better in services to not define the realtive paths
import { OrderItem } from '../models/order-item';
import {StripeService} from 'ngx-stripe'

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.api_url + 'orders';
    apiURLProducts = environment.api_url + 'products';

    constructor(private http: HttpClient , private stripeService:StripeService) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, order);
    }

    updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
    }

    deleteOrder(orderId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
    }
    getOrdersCount(): Observable<number> {
        return this.http.get<number>(`${this.apiURLOrders}/get/count`).pipe(map((objectValue: any) => objectValue.OrdersCount));
    }
    getTotalSales(): Observable<number> {
        return this.http.get<number>(`${this.apiURLOrders}/get/totalsales`).pipe(map((objectValue: any) => objectValue.totalsales));
    }

    // to avoid circular library dependency
    getProduct(productId: string): Observable<any> {
        return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
    }

    // post a checkout payment by stripe
    createCheckout(orderItem: OrderItem[]) {
        return this.http.post<any>(`${this.apiURLOrders}/create-checkout-session`, orderItem).pipe(switchMap((session : { id:string })=>{
        return this.stripeService.redirectToCheckout({sessionId:session.id})
        }))
        // switchMap each emission the previous inner observable (the result of the function you supplied)
        // is cancelled and the new observable is subscribed .. going to switch how it looklike and return in another shape of it
        // we used pipe to not make a nested subscribe in rxjs or angular in common that not best practise
    };
    cacheOrderData(order:Order){
        localStorage.setItem('OrderData' , JSON.stringify(order))
    }
    getCachedOrderData():Order{
        const orderData:any = localStorage.getItem('OrderData')
        return JSON.parse(orderData) 
    }
    RemoveCachedOrderData(){
        localStorage.removeItem('OrderData')
    }
}