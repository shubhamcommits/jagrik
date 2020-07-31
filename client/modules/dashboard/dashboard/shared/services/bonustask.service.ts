import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnyRecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class BonusTaskService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Service function to call the http request to fetch bonus task list
   * @param classId
   */
  getBonusTaskList(classId: any) {
    return this.httpClient
      .get(environment.baseApiUrl + '/bonustasks/get-bonus-tasks', {
        params: {
          classId: classId,
        },
      })
      .toPromise();
  }


  /**
   * This function is responsible for add new bonus task
   * @object data
   */
  addNewBonusTask(data: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/bonustasks/create-bonus-task', data)
      .toPromise();
  }

  /**
  * This function is responsible for submit bonus task
  * @param image
  * @param bonusTaskId
  */
  submitBonusTaskResponse(image: File, bonusTaskId: any) {
    let formData: FormData = new FormData();
    formData.append('supporting_doc', image);
    formData.append('bonusTaskId', bonusTaskId);
    return this.httpClient
      .post(environment.baseApiUrl + '/bonustasks/user-submit-bonus-task', formData)
      .toPromise();
  }

  /**
  * This function is responsible for delete bonus task
  * @object bonusTaskId
  */
  deleteBonusTask(bonusTaskId: any) {
    return this.httpClient
      .delete(environment.baseApiUrl + '/bonustasks/delete-bonus-task', {
        params: {
          bonusTaskId: bonusTaskId,
        },
      })
      .toPromise();
  }
}
