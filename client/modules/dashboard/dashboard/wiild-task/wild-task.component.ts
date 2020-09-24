import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { TeamService } from '../shared/services/team.service';
import { ClassService } from '../shared/services/class.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddWildTaskComponent } from './add-wild-task/add-wild-task.component';

@Component({
  selector: 'app-wild-task',
  templateUrl: './wild-task.component.html',
  styleUrls: ['./wild-task.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class WildTaskComponent implements OnInit {

  userRole = '';
  userData: any = []
  showAssignTask:boolean = false
  className = '';
  teamData: any = []
  bonusTaskData: any = []
  isUploaded: Boolean = false;
  wildTask: any = []
  taskList: any = []
  taskStatus: any = []
  individualTaskStatus: any;
  constructor(
    private userService: UserService,
    private classService: ClassService,
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.userRole = this.storageService.getLocalData('userData').role;
    this.userData = this.storageService.getLocalData('userData');
    this.getTeamTaskStatus()
  }

  openDialog(task: any) {
    let dialogRef = this.dialog.open(AddWildTaskComponent, {
      data: {
        task: task,
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });

    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close()
      this.getTeamWildTaskStatus()
    });
  }

  assignWildCard() {
    this.userService
      .assignWildCard()
      .then((res) => {
        window.location.reload();

      })
      .catch(() => {
        // Fire error toast
        this.utilityService.fireToast(
          'error',
          `Some unexpected error occured, please try again!`
        );
      });
  }

  getUserData() {
    return new Promise((resolve) => {
      this.userService
        .get()
        .then((res) => {
          this.storageService.setLocalData('userData', JSON.stringify(res['user']));
          this.userData = this.storageService.getLocalData('userData');
          this.userData.tasks.forEach(element => {
            if (element.type === 'wild') {
              this.getTaskList(element._card)
            }
          });
        })
        .catch(() => {
          resolve({});
        });
    });
  }

  getTaskList(cardId: any) {
    return new Promise((resolve) => {

      this.teamService
        .fetchTasks(cardId)
        .then((res) => {
          this.taskList = res['tasks']
          this.getTeamWildTaskStatus()
        })
        .catch(() => {
          resolve({});
        });
    });
  }

  getTeamTaskStatus() {
    return new Promise((resolve) => {
      this.teamService
        .teamTaskStatus(this.userData.teams[0]._id, 'wild')
        .then((res) => {
          if (res['response']['status'] === false) {
            this.showAssignTask = false;
            this.getTaskList(res['response']['cardId']);
          } else {
            this.showAssignTask = true;
          }
        })
        .catch(() => {
          resolve({});
        });
    });
  }

  getTeamWildTaskStatus() {

    return new Promise((resolve) => {
      // Call the service function
      this.classService
        .getTeamTaskStatus(this.userData.teams[0]._id, 'wild')
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
          this.utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }

}
