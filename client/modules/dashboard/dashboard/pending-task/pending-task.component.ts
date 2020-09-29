import { Component, OnInit, Input } from '@angular/core';
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
  @Input() teamId: string;

  constructor(
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private bonusTaskService: BonusTaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.teamId);
    this.userRole = this.storageService.getLocalData('userData').role;
    if (this.teamId === '') {
      this.teamId = this.storageService.getLocalData('userData').teams[0]._id
    }
    this.getAllTask(this.teamId);

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
    this.router.navigate(['dashboard/task-detail/' + this.teamId]);
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
