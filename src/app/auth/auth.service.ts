import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = true;
  private _userID = "usr1";
  // private _isLoggedIn = false;
  // private _userIsAuthenticated = false;

  get isLoggedIn()
  {
    return this._isLoggedIn;
  }

  get userID()
  {
    return this._userID;
  }

  constructor() { }

  login(){
    this._isLoggedIn = true;
  }

  logout(){
    this._isLoggedIn = false;
  }
}
