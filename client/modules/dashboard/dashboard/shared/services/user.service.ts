import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  /**
   * This function is responsible for assigning a card to the user
   * @param theme
   * @param week
   */
  assignCard(theme: String, week: Number) {
    return this.httpClient
      .post(environment.baseApiUrl + '/users/assign-card', {
        card_theme: theme,
        week: week,
      })
      .toPromise();
  }

  /**
  * This function is responsible for assigning a wild card to the user
  */
  assignWildCard() {
    return this.httpClient
      .get(environment.baseApiUrl + '/users/assign-wild-card')
      .toPromise();
  }

  /**
   * This function is responsible for update user profile
   * @param user
   */
  updateProfile(userData: any) {
    return this.httpClient
      .put(environment.baseApiUrl + '/users', { user: userData })
      .toPromise();
  }

  /**
   * This function is responsible for upload user profile picture
   * @param user
   */
  uploadImage(image: File) {
    let formData: FormData = new FormData();
    formData.append('profile_picture', image);
    return this.httpClient
      .post(
        environment.baseApiUrl + '/users/profile-picture',
        formData
      )
      .toPromise();
  }

  /**
   * This function is responsible for fetching the current user's details
   */
  get() {
    return this.httpClient.get(environment.baseApiUrl + '/users').toPromise();
  }

  /**
   * This function is responsible for upload document against task
   * @param image
   * @param taskId
   */
  uploadWildTaskDocument(image: File, taskId: any, experience_description: any, description: any, title: any) {
    let formData: FormData = new FormData();
    formData.append('supporting_doc', image);
    formData.append('taskId', taskId);
    formData.append('description', description);
    formData.append('experience_description', experience_description);
    formData.append('title', title);
    return this.httpClient
      .post(environment.baseApiUrl + '/users/wild-task-doc-upload', formData)
      .toPromise();
  }
}
