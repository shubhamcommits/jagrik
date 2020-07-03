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
    return this.httpClient.get(environment.baseApiUrl + '/classes/get-teams/', {
      params: {
        classId: classId
      }
    }).toPromise()
  }
}
