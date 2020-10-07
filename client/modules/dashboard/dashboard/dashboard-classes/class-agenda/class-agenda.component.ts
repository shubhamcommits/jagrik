import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { ClassService } from '../../shared/services/class.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
declare var $: any;
require('src/assets/jquery.sha1.js');
import { AddMeetingModalComponent } from "./add-meeting-modal/add-meeting-modal.component";
import { log } from 'console';
@Component({
  selector: 'app-class-agenda',
  templateUrl: './class-agenda.component.html',
  styleUrls: ['./class-agenda.component.scss'],
  providers: [DatePipe]
})
export class ClassAgendaComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private utilityService: UtilityService,
    private classService: ClassService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }
  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  userData: any = [];
  urlArray: any = {};
  allMeetings: any = [];
  myDate = new Date();
  myTime = Date.now();
  upcoming: boolean = false;
  classId: any;
  sched: any = [];

  ngOnInit(): void {

    this.classId = this.storageService.getLocalData('userData').classes[0];
    this.userData = this.storageService.getLocalData('userData');
    console.log(this.classId);

    // this.allMeetings.forEach(item => {
    //   // if( this.datePipe.transform(item.schedules.date, 'dd/MM/yyyy') > this.datePipe.transform(this.myDate, 'dd/MM/yyyy') ){
    //   //   this.upcoming = true;
    //   // }
    // });
    console.log('sadakjsd');
    this.getClassDetails(this.classId);
    if (
      this.storageService.existData('new') &&
      this.storageService.getLocalData('new') == 'yes'
    ) {
      this.storageService.setLocalData('new', 'no');
      window.location.reload();
    }



    // this.sched.forEach(item => {
    //   if( this.datePipe.transform(item.date, 'dd/MM/yyyy') > this.datePipe.transform(this.myDate, 'dd/MM/yyyy') )
    //   {
    //     console.log(this.datePipe.transform(item.schedules.date, 'dd/MM/yyyy'));
    //      this.upcoming = true;
    //   }
    // });
  }

  addMeeting() {
    let dialogRef = this.dialog.open(AddMeetingModalComponent, {
      data: {
        team: '',
      },
      autoFocus: false,
      maxHeight: '80vh',
      minHeight: '50vh',
      maxWidth: '60vw',
      minWidth: '40vw',
    });
    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close();
      this.getClassDetails(this.classId)
    });
  }

  getClassDetails(classId: any) {
    console.log('dsjd');

    return new Promise((resolve) => {
      // Fetch class details
      this.classService
        .getClassDetails(classId)
        .then((res) => {
          console.log('------------');
          console.log( res['class']['schedules']);
          console.log('------------');

          this.sched= res['class']['schedules'];
          this.sched = this.helper(this.sched);
          this.allMeetings = res['class'];
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast('warning', `Something went wrong`);
        });
    });
  }

  helper(sched: any){
    let newSched = [];
    sched.forEach(item => {
      console.log(item.date);
      console.log(this.myDate);

      console.log(this.datePipe.transform(item.date, 'dd/MM/yyyy'));
      console.log(this.datePipe.transform(this.myDate, 'dd/MM/yyyy'));
      console.log(item.time);
      console.log( this.datePipe.transform(this.myDate, 'HH:mm'));

      if(this.datePipe.transform(item.date, 'dd/MM/yyyy') >= this.datePipe.transform(this.myDate, 'dd/MM/yyyy') && item.time > this.datePipe.transform(this.myDate, 'HH:mm'))
      {
        console.log(this.datePipe.transform(item.date, 'dd/MM/yyyy') + ' '+ item.time );
        console.log(this.datePipe.transform(this.myDate, ' HH:mm') );
        // console.log(this.datePipe.transform(item.schedules.date, 'dd/MM/yyyy'));
        //  this.upcoming = true;
        newSched.push(item);
      }
    });
    return newSched;
  }


}
