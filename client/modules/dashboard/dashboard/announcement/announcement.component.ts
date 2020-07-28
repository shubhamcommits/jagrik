import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../shared/services/announcement.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementModalComponent } from './add-announcement-modal/add-announcement-modal.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class AnnouncementComponent implements OnInit {

  constructor(private announcementService: AnnouncementService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    public dialog: MatDialog) { }

  userRole = '';
  className = '';
  announcementData: any = [];

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;

    this.getAnncouncementList()
  }

  openDialog(data:any, type: string) {
    let dialogRef = this.dialog.open(AddAnnouncementModalComponent, {
      data: {
        detail: data,
        type: type
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });

    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close()
      this.getAnncouncementList()
    });
  }

  getAnncouncementList() {
    return new Promise((resolve) => {

      // Fetch class details
      this.announcementService
        .getAnnouncementList(this.storageService.getLocalData('userData').classes[0])
        .then((res) => {
          this.announcementData = res['announcements']
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }

  deleteAnnouncement(id: any) {
    return new Promise((resolve) => {

      // Fetch class details
      this.announcementService
        .deleteAnnouncement(id)
        .then((res) => {
          this.getAnncouncementList()
          this.utilityService.fireToast(
            'success',
            `Announcement deleted successfully`
          );
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }



}
