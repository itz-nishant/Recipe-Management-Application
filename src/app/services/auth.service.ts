import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: any;

  constructor() { }

  login(user: any) {
    this.loggedIn = true;
    this.currentUser = user;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  getCurrentUserId(): any {
    if (this.currentUser && this.currentUser.id) {
      return this.currentUser.id;
    }
    return null;
  }
}
