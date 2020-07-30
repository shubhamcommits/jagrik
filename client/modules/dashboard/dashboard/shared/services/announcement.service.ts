import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnyRecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Service function to call the http request to fetch announcement list
   * @param classId
   */
  getAnnouncementList(classId: any) {
    return this.httpClient
      .get(environment.baseApiUrl + '/announcements/get-class-announcements', {
        params: {
          classId: classId,
        },
      })
      .toPromise();
  }


  /**
   * This function is responsible for add new announcement
   * @object data
   */
  addNewAnnouncement(description: any, title: any, classId: any) {
    return this.httpClient
      .post(environment.baseApiUrl + '/announcements/create-announcement', {
        classId: classId,
        description: description,
        title: title,
      })
      .toPromise();
  }

  /**
   * This function is responsible for update announcement
   * @object data
   */
  updateAnnouncement(description: any, title: any, classId: any, id: any) {
    return this.httpClient
      .put(environment.baseApiUrl + '/announcements/edit-announcement', {
        classId: classId,
        description: description,
        title: title,
        announcementId: id,
      })
      .toPromise();
  }

  /**
  * This function is responsible for delete announcement
  * @object announcementId
  */
  deleteAnnouncement(announcementId: any) {
    return this.httpClient
      .delete(environment.baseApiUrl + '/announcements/delete-announcement', {
        params: {
          announcementId: announcementId,
        },
      })
      .toPromise();
  }
}
