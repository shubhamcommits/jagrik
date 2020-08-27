import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { ClassService } from '../../shared/services/class.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
declare var $: any;
require('src/assets/jquery.sha1.js');
import { AddMeetingModalComponent } from "./add-meeting-modal/add-meeting-modal.component";
@Component({
  selector: 'app-class-agenda',
  templateUrl: './class-agenda.component.html',
  styleUrls: ['./class-agenda.component.scss'],
})
export class ClassAgendaComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private utilityService: UtilityService,
    private classService: ClassService,
    private dialog: MatDialog
  ) { }
  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  userData: any = [];
  urlArray: any = {};
  allMeetings: any = [];

  ngOnInit(): void {

    this.userData = this.storageService.getLocalData('userData');
    if (
      this.storageService.existData('new') &&
      this.storageService.getLocalData('new') == 'yes'
    ) {
      this.storageService.setLocalData('new', 'no');
      window.location.reload();
    }
    this.getClassDetails();

  }

  addMeeting() {
    let dialogRef = this.dialog.open(AddMeetingModalComponent, {
      data: {
        team: '',
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });
    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close();
      this.getClassDetails()
    });
  }

  getClassDetails() {
    return new Promise((resolve) => {
      // Fetch class details
      this.classService
        .getClassDetails(this.userData.classes[0])
        .then((res) => {
          this.allMeetings = res['class'];
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast('warning', `Something went wrong`);
        });
    });
  }

}
