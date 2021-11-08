import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  setToken(data:any){
    localStorage.setItem(TOKEN , data)
  }
  getToken() {
    return localStorage.getItem(TOKEN);
  }
  removeToken(){
    localStorage.removeItem(TOKEN)
  }
  isValidToken(){
    const Token = this.getToken();
    if(Token){
      const tokenDecode = JSON.parse(atob(Token.split('.')[1])); // atob => is a decoding method
      return !this._tokenExpired(tokenDecode.exp) // this will return true or false
    }
    else{
      return false
    }
  }
  private _tokenExpired(expiration:any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  getUserIdFromToken(){
    const Token = this.getToken();
    if(Token){
      const tokenDecode = JSON.parse(atob(Token.split('.')[1])); // atob => is a decoding method
      if(tokenDecode){
        return tokenDecode.userId;
      }
      else{
        return null
      }
    }
    else{
      return null
    }
  }

}
