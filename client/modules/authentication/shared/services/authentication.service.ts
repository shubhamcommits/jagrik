import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Service function to call the http request to sign-up the user
   * @param userData 
   */
  signUp(userData: any){
    return this.httpClient.post(environment.baseApiUrl + '/auths/sign-up', {
      user: userData
    }).toPromise()
  }

  /**
   * Service function to call the http request to sign-in the user
   * @param userData 
   */
  signIn(userData: any){
    return this.httpClient.post(environment.baseApiUrl + '/auths/sign-in', {
      user: userData
    }).toPromise()
  }

  /**
   * Service function to call the http request to sign-out the user
   * @param userId 
   */
  signOut(userId: any){
    return this.httpClient.post(environment.baseApiUrl + '/auths/sign-out', {
      userId: userId
    }).toPromise()
  }
}
