import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class passwordGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.checkLogin();
    if (!isLoggedIn) {
      this.router.navigate(['/home']);
      return false; // Access denied
    }

    return true; // Access granted
  }

  checkLogin(): boolean {
    // Implement login check logic here
    return true; // Simulating not logged in
  }
};
