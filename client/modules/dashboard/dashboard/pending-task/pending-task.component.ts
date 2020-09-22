import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { BonusTaskService } from '../shared/services/bonustask.service';
import { PendingTaskViewModalComponent } from './pending-task-view-modal/pending-task-view-modal.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-pending-task-view',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class PendingTaskViewComponent implements OnInit {
  userRole = '';
  className = '';
  teamData: any = [];
  taskData:any = []
  bonusTaskData: any = [];
  isUploaded: Boolean = false;

  constructor(
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private bonusTaskService: BonusTaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;
    this.getAllTask(this.storageService.getLocalData('userData').teams[0]._id);
    console.log(this.storageService.getLocalData('userData').teams[0]._id);
  }

  openResponseViewDialog(task: any) {
    // let dialogRef = this.dialog.open(PendingTaskViewModalComponent, {
    //   data: {
    //     task,
    //   },
    //   autoFocus: false,
    //   maxHeight: '90vh',
    //   minWidth: '40vw',
    // });

    this.storageService.setLocalData('team_task_detail', JSON.stringify(task));
    this.router.navigate(['dashboard/task-detail/' + this.storageService.getLocalData('userData').teams[0]._id]);
  }

  getAllTask(teamId) {
    this.teamService
      .fetchTasksByTeamId(teamId)
      .then((res) => {
        console.log(res['tasks']);
        this.taskData = res['tasks'];
        for (let [key, value] of Object.entries(this.taskData)) {
          let data = value['team']
          data['team_members_tasks'] = value['user']

          this.teamData.push(data)

        }
        // this.taskData.forEach(element => {
        //   if (this.teamData[element['week']] !== undefined) {
        //     this.teamData[element['week']].push(element)
        //   } else {
        //     this.teamData[element['week']] = []
        //     this.teamData[element['week']].push(element)
        //   }
        // });
      })
      .catch((error) => {
        // Fire error toast
        this.utilityService.fireToast(
          'error',
          `Some unexpected error occured, please try again!`
        );
      });
  }


}
