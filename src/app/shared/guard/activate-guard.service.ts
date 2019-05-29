import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class ActivateGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if ('a' === 'a') {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
