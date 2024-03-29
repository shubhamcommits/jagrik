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
}
