import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Service function to get list of student with team
   * @param classId
   */
  getTeams(classId: any) {
    return this.httpClient.post(environment.baseApiUrl + '/classes/get-teams/',  {
        classId: classId
      }
    ).toPromise()
  }

  /**
  * Service function to assign team to a student
  * @param classId
  * @param userId
  */
  createTeam(classId: any, userId: any) {
    return this.httpClient.post(environment.baseApiUrl + '/classes/create-teams/', {
      classId: classId,
      userId: userId
    }
    ).toPromise()
  }
}
