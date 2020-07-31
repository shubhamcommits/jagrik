import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBonusTaskModalComponent } from './add-bonus-task-modal/add-bonus-task-modal.component';
import { UploadTaskModalComponent } from './upload-task-modal/upload-task-modal.component';
import { BonusTaskService } from '../shared/services/bonustask.service';

@Component({
  selector: 'app-bonus-task',
  templateUrl: './bonus-task.component.html',
  styleUrls: ['./bonus-task.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class BonusTaskComponent implements OnInit {

  userRole = '';
  className = '';
  teamData: any = []
  bonusTaskData: any = []
  isUploaded: Boolean = false;
  constructor(
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private bonusTaskService: BonusTaskService
  ) { }

  ngOnInit(): void {
    this.getBonusTaskList()
    this.userRole = this.storageService.getLocalData('userData').role;
    this.getTeams();
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddBonusTaskModalComponent, {
      data: {
        teams: this.teamData
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });

    dialogRef.componentInstance.getBonusTaskData.subscribe(($e) => {
      dialogRef.close()
      this.getBonusTaskList()
    });
  }

  openResponseDialog(task:any) {
    let dialogRef = this.dialog.open(UploadTaskModalComponent, {
      data: {
        task
      },
      autoFocus: false,
      maxHeight: '90vh',
      minWidth: '40vw',
    });

    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close()
      this.getBonusTaskList()
    });
  }

  getBonusTaskList() {
    this.bonusTaskService
      .getBonusTaskList(this.storageService.getLocalData('userData').classes[0])
      .then((res) => {
        var temp:any = res['result']
        temp.forEach(element => {
          if (element['response']) {
            element['response'].forEach(element1 => {
              if (element1.user_id == this.storageService.getLocalData('userData')._id) {
                element['isUploaded'] = true
              } else {
                element['isUploaded'] = false
              }
            });
          } else {
            element['isUploaded'] = false
          }
          this.bonusTaskData.push(element)
        });
        this.utilityService.fireToast(
          'success',
          `Data fetched successfully`
        );
      })
      .catch(() => {
        // Fire error toast
        this.utilityService.fireToast(
          'error',
          `Some unexpected error occured, please try again!`
        );
      });
  }

  getTeams() {
    this.teamService
      .getTeams(this.storageService.getLocalData('userData').classes[0])
      .then((res) => {
        this.teamData = res['teams']
      })
      .catch(() => {
        // Fire error toast
        this.utilityService.fireToast(
          'error',
          `Some unexpected error occured, please try again!`
        );
      });
  }
}
