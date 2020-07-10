import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;
  // private _isLoggedIn = false;
  // private _userIsAuthenticated = false;

  get isLoggedIn()
  {
    return this._isLoggedIn;
  }

  constructor() { }

  login(){
    this._isLoggedIn = true;
  }

  logout(){
    this._isLoggedIn = false;
  }
}
