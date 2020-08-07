import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../shared/services/class.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDetailModalComponent } from './task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-facilitator-view',
  templateUrl: './facilitator-view.component.html',
  styleUrls: ['./facilitator-view.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    `,
  ],
})
export class FacilitatorViewComponent implements OnInit {
  constructor(
    private classService: ClassService,
    private storageService: StorageService,
    private utilityService: UtilityService,
    public dialog: MatDialog
  ) {}

  is_completedTask = false;
  dataSource: any = [];

  ngOnInit(): void {
    this.getCompletedTeam(
      this.storageService.getLocalData('userData').classes[0]
    );
  }

  openDialog(team: any) {
    let dialogRef = this.dialog.open(TaskDetailModalComponent, {
      data: {
        team,
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw'
    });

    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close()
      this.getCompletedTeam(this.storageService.getLocalData('userData').classes[0])
    });
  }

  getCompletedTeam(classId) {
    this.dataSource = []
    return new Promise((resolve) => {
      // Call the service function
      this.classService
        .getCompletedTaskTeam(classId)
        .then((res) => {
          var data: any = res;
          data.tasks.forEach(element => {
            if (element['team_status'] === 'complete'){
              this.dataSource.push(element);
          }
          });

          if (this.dataSource.length > 0) {
            this.is_completedTask = true;
          }
          // Fire sucess toast
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
    });
  }
}
