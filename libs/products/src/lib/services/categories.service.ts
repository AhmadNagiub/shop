import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURLProducts = environment.api_url+'categories';

  constructor( private http :HttpClient ) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiURLProducts}`)
  }
  getCategory(catId:string):Observable<Category>{
    return this.http.get<Category>(`${this.apiURLProducts}/${catId}` );
  }
  createCategory(category:Category){
    return this.http.post(`${this.apiURLProducts}` , category);
  }
  updateCategory(category : Category , id:string):Observable<Category>{
    return this.http.put(`${this.apiURLProducts}/${id}` , category)
  }
  deleteCategory(catId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiURLProducts}/${catId}` );
  }
}
