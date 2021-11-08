import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.api_url+'users';

  constructor(private http:HttpClient ,private token: LocalStorageService,private router: Router) { }



  login(email:string , password:string): Observable<User>{

    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, passwordHash:password });

  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
