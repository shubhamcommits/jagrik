import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Service function to get list of student with team
   * @param classId
   */
  getTeams(classId: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/classes/get-teams/', {
        classId: classId,
      })
      .toPromise();
  }

  /**
   * Service function to assign team to a student
   * @param classId
   * @param userId
   */
  createTeam(classId: any, userId: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/classes/create-teams/', {
        classId: classId,
        userId: userId,
      })
      .toPromise();
  }

  /**
   * This function is responsible for assigning a card to the user
   * @param theme
   * @param week
   */
  assignCard(theme: String, week: Number, teamId: String) {
    return this.httpClient
      .post(environment.baseApiUrl + '/teams/assign-card', {
        card_theme: theme,
        week: week,
        teamId: teamId,
      })
      .toPromise();
  }

  fetchTasks(cardId) {
    return this.httpClient
      .get(environment.baseApiUrl + '/tasks', {
        params: {
          cardId: cardId,
        },
      })
      .toPromise();
  }

  /**
  * This function is responsible for assign points
  * @object data
  */
  assignPoint(teamId: any, teamPoints: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/teams/submit-task-points', {
        teamId: teamId,
        teamPoints: teamPoints,
      })
      .toPromise();
  }

  /**
   * This function is responsible for upload document against task
   * @param image
   * @param taskId
   * @param teamId
   */
  uploadTaskDocument(image: File, teamId: any, taskId: any, description: any) {
    let formData: FormData = new FormData();
    formData.append('supporting_doc', image);
    formData.append('taskId', taskId);
    formData.append('teamId', teamId);
    formData.append('description', description);
    return this.httpClient
      .post(environment.baseApiUrl + '/users/task-doc-upload', formData)
      .toPromise();
  }
}
