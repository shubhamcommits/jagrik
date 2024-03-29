import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnyRecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Service function to call the http request to create a class
   * @param name
   */
  createClass(name: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/classes/', {
        class: {
          name: name,
        },
      })
      .toPromise();
  }

  /**
   * Service function to call the http request to fetch class details
   * @param classId
   */
  getClassDetails(classId: any) {
    return this.httpClient
      .get(environment.baseApiUrl + '/classes/', {
        params: {
          classId: classId,
        },
      })
      .toPromise();
  }

  /**
   * Service function to call the http request to invite a student to a class
   * @param email
   * @param classId
   */
  inviteToClass(email: any, classId: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/classes/invite-to-class', {
        studentEmails: [email],
        classId: classId,
      })
      .toPromise();
  }

  /**
   * Service function to call the http request to joing a student to a class
   * @param email
   * @param classId
   * @param class_code (optional)
   */
  joinToClass(classId: any, class_code?: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/classes/join-class', {
        classId: classId,
        class_code: class_code,
      })
      .toPromise();
  }

  /**
   * This function is responsible for get team status of task
   * @param teamId
   */
  getTeamTaskStatus(teamId: any) {
    return this.httpClient
      .get(environment.baseApiUrl + '/classes/get-team-member-task-status', {
        params: {
          teamId: teamId,
        },
      })
      .toPromise();
  }

  /**
   * This function is responsible for get completed taskf team
   * @param classIId
   */
  getCompletedTaskTeam(classId: any) {
    return this.httpClient
      .get(environment.baseApiUrl + '/classes//get-completed-team-tasks', {
        params: {
          classId: classId,
        },
      })
      .toPromise();
  }
}
