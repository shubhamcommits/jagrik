import { Component, OnInit, Injector, Input, Inject } from '@angular/core';
import { TeamService } from '../../shared/services/team.service';
import { ClassService } from '../../shared/services/class.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskViewComponent } from './task-view/task-view.component';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    private injector: Injector,
    public dialog: MatDialog,
    private classService: ClassService
  ) {}

  data: any = {
    tasks: [],
    card: {},
  };

  userData: any;
  taskStatus: any;
  individualTaskStatus: any;

  @Input('cardId') cardId: any;

  async ngOnInit() {
    this.data = await this.getTaskList(this.cardId);
    this.userData = this.getUserData();
    if (
      this.userData['teams'][0]['tasks'][
        this.userData['teams'][0]['tasks'].length - 1
      ].hasOwnProperty('_task')
    ) {
      console.log('check');
    }
    this.getTeamTaskStatus();
  }

  openDialog(task: any) {
    let dialogRef = this.dialog.open(TaskViewComponent, {
      data: {
        task,
      },

    });
    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      this.getUploadResponse($e)
    });
  }

  getUploadResponse(value) {
    this.getTeamTaskStatus()
  }

  selectSelfTask(taskId: any) {
    this.userData.tasks[this.userData.tasks.length - 1]._task = taskId;

    console.log(this.userData.tasks[this.userData.tasks.length - 1]._task);

    const storageService = this.injector.get(StorageService);
    return storageService.setLocalData(
      'userData',
      JSON.stringify(this.userData)
    );
  }

  unassignOtherSelfTask() {
    let utilityService = this.injector.get(UtilityService);

    // Fire sucess toast
    utilityService.fireToast(
      'success',
      `Self task for the week is updated!`,
      3000
    );

    this.data.tasks.forEach((element) => {
      if (element.category == 'self') {
        element.assigned = false;
      }
    });
  }

  unassignOtherCommunityTask() {
    let utilityService = this.injector.get(UtilityService);

    // Fire sucess toast
    utilityService.fireToast(
      'success',
      `Team task for the week is updated!`,
      3000
    );
    this.data.tasks.forEach((element) => {
      if (element.category == 'community') {
        element.assigned = false;
      }
    });
  }

  getUserData() {
    const storageService = this.injector.get(StorageService);
    return storageService.getLocalData('userData');
  }

  getTeamTaskStatus() {
    let utilityService = this.injector.get(UtilityService);

    return new Promise((resolve) => {
      // Call the service function
      this.classService
        .getTeamTaskStatus(this.userData.teams[0]._id)
        .then((res) => {
          // Fire sucess toast
          this.taskStatus = res['teamStatus'];
          if (this.taskStatus.teamMembers.length > 0) {
            this.taskStatus.teamMembers.forEach((element) => {
              if (element.user_email == this.userData.email) {
                this.individualTaskStatus = element.user_individual_task_status;
              }
            });
          }
        })
        .catch(() => {
          // Fire error toast
          utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }

  getTaskList(cardId: any) {
    return new Promise((resolve) => {
      const teamService = this.injector.get(TeamService);

      teamService
        .fetchTasks(cardId)
        .then((res) => {
          res['tasks'].forEach((task) => {
            task.title =
              task.title.split('-')[1] == 'Com'
                ? 'Community Task'
                : 'Self Task';

            task.assigned = false;

            if (task.title == 'Self Task') {
              let userData = this.getUserData();

              if (userData.tasks[userData.tasks.length - 1].status == 'to do') {
                task.status = 'to do';
              }
            }
          });

          resolve({
            tasks: res['tasks'],
            card: res['card'],
          });
        })
        .catch(() => {
          resolve({});
        });
    });
  }
}
