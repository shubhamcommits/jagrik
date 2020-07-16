import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from '../storage-service/storage.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  public headers: HttpHeaders;
  /**
   * This function handles and intercepts the incoming request to check if that has a valid @name AuthorizationHeader or not
   * Fetches the token stored on @localhost named as @name authToken
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storageService = this.injector.get(StorageService);

    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set(
      'Access-Control-Allow-Headers',
      'Origin, Authorization, Content-Type, Accept'
    );
    request = request.clone({
      headers: this.headers,
    });
    if (storageService.existData('authToken')) {
      let token = storageService.getLocalData('authToken')
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) })
      }
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }));
  }

}
