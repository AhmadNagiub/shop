
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../user-state/users.facade';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers = environment.api_url+'users';

  constructor(private http: HttpClient , private userfacda:UsersFacade) {
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiURLUsers)
  }
  getUser(catId:string):Observable<User>{
    return this.http.get<User>(`${this.apiURLUsers}/${catId}` );
  }
  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.apiURLUsers , user);
  }
  updateUser(user : User , id:string){
    return this.http.put(`${this.apiURLUsers}/${id}` , user)
  }
  deleteUser(catId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiURLUsers}/${catId}` );
  }

  getCountries(): { id: string; name: string }[] {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }



  getUsersCount():Observable<number>{
    return this.http.get<number>(`${this.apiURLUsers}/get/count`).pipe(map((objectValue:any) => objectValue.userCount))
  }

  initAppSession(){
    this.userfacda.buildUserSession();
  }
  observeCurrentUser(){
    return this.userfacda.currentUser$;
  }
  isCurrentUserAuth(){
    return this.userfacda.isAuth$;
  }
}
