import { Component, OnInit, Injector, Input, Inject } from '@angular/core';
import { TeamService } from '../../shared/services/team.service';
import { ClassService } from '../../shared/services/class.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskViewComponent } from './task-view/task-view.component';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { Router } from '@angular/router';
import * as confetti from 'canvas-confetti';
@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TasksListComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    private injector: Injector,
    private router: Router,
    public dialog: MatDialog,
    private classService: ClassService
  ) {}

  data: any = {
    tasks: [],
    card: {},
  };

  userData: any;
  substring = 'inbox';
  isdash: boolean = false;
  isdash1: boolean = true;
  taskStatus: any;
  individualTaskStatus: any;
  displayedColumns: string[] = ['Description'];
  week: any;
  taskList: any = [];

  @Input('cardId') cardId: any;
  cardIdx: any;

  async ngOnInit() {
    // console.log(this.isdash1)
    let currentUrl = this.router.url;
    this.isdash = currentUrl.includes(this.substring);
    // console.log(this.isdash);
    this.userData = this.getUserData();
    this.cardIdx = '';
    if (this.userData.tasks.length > 0) {
      this.userData.tasks.forEach((element) => {
        if (element.type !== 'wild') {
          this.taskList.push(element);
        }
      });
      this.cardIdx = this.taskList[this.taskList.length - 1]._card;
    }

    this.data = await this.getTaskList(this.cardIdx);
    console.log(this.cardIdx, 'heilo', this.cardId);

    if (
      this.userData['teams'][0]['tasks'][
        this.userData['teams'][0]['tasks'].length - 1
      ].hasOwnProperty('_task')
    ) {
      console.log('check');
    }
    this.getTeamTaskStatus();
  }

  startConfe() {
    var myCanvas = document.getElementById('my-canvas');
    myCanvas.classList.add('show-canvas')
    var myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 1200,
      spread: 250,
    });

    setTimeout(() => {
      myCanvas.classList.remove('show-canvas');
      myConfetti.reset();
    }, 5000);

  }

  openDialog(task: any) {

    // this.startConfe();

    let dialogRef = this.dialog.open(TaskViewComponent, {
      data: {
        task,
        week: this.taskList[this.taskList.length - 1]?.week,
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '90vw',
    });
    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      if ($e === 'success') {
        this.startConfe();
      }
      this.getUploadResponse($e);
    });
  }

  getUploadResponse(value) {
    this.getTeamTaskStatus();
  }

  selectSelfTask(taskId: any) {
    this.userData.tasks[this.userData.tasks.length - 1]._task = taskId;

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
        .getTeamTaskStatus(this.userData.teams[0]._id, 'general')
        .then((res) => {
          // Fire sucess toast
          this.taskStatus = res['teamStatus'];
          if (this.taskStatus.teamMembers.length > 0) {
            this.taskStatus.teamMembers.forEach((element) => {
              if (element.user_email == this.userData.email) {
                this.individualTaskStatus = element.user_individual_task_status;
              }
              if (
                element.user_individual_task_status === false &&
                this.isdash === true
              ) {
                this.isdash1 = !this.isdash1;
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

  getTaskList(cardIdx: any) {
    return new Promise((resolve) => {
      const teamService = this.injector.get(TeamService);

      teamService
        .fetchTasks(cardIdx)
        .then((res) => {
          res['tasks'].forEach((task) => {
            task.title =
              task.title.split('-')[1] == 'Com'
                ? 'Community Task'
                : 'Self Task';

            task.assigned = false;

            if (task.title == 'Self Task') {
              // let userData = this.getUserData();

              if (this.taskList[this.taskList.length - 1].status == 'to do') {
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
