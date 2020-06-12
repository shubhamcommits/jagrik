import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _Router: Router,
    private _Injector: Injector) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Create storage service instance 
    let storageService = this._Injector.get(StorageService)

    // Fetch the token from the storage service
    let authToken = storageService.existData('authToken');

    if (authToken) {

      // Fetch current user details from the storage service
      let userData = (storageService.existData('userData') === null) ? {} : storageService.getLocalData('userData');

      return true

    } else {

        // Navigate the User to by default location
        this._Router.navigate(['/home'], { queryParams: { next, state } })

        return false

    }
  }

}
