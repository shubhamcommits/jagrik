import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Service function to call the http request to create a class
   * @param name
   */
  createClass(name: any){
    return this.httpClient.post(environment.baseApiUrl + '/classes/', {
      class:{
        name: name
      }
    }).toPromise()
  }

  /**
   * Service function to call the http request to invite a student to a class
   * @param email
   * @param classId
   */
  inviteToClass(email: any, classId: any){
    return this.httpClient.post(environment.baseApiUrl + '/classes/invite-to-class', {
      studentEmails: [email],
      classId: classId
    }).toPromise()
  }

  /**
   * Service function to call the http request to joing a student to a class
   * @param email
   * @param classId
   */
  joinToClass(classId: any){
    return this.httpClient.post(environment.baseApiUrl + '/classes/join-class', {
      classId: classId
    }).toPromise()
  }
}
