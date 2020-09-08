import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { TeamService } from '../shared/services/team.service';
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
  className = '';
  teamData: any = []
  bonusTaskData: any = []
  isUploaded: Boolean = false;
  wildTask: any = []
  taskList: any = []
  taskStatus:boolean = false
  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;
    this.wildTask = this.storageService.getLocalData('userData').wild_tasks;
    if (this.wildTask.length > 0) {
      this.getTaskList(this.wildTask[0]['_card'])
      this.taskStatus = this.wildTask[0]['status'] === 'complete' ? true : false
    }
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
      this.getUserData()
    });
  }

  assignWildCard() {
    this.userService
      .assignWildCard()
      .then((res) => {
        this.storageService.setLocalData('userData', JSON.stringify(res['user']));
        this.wildTask = res['user']['wild_tasks']
        this.getTaskList(res['user']['wild_tasks'][0]['_card'])
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
          this.wildTask = this.storageService.getLocalData('userData').wild_tasks;
          if (this.wildTask.length > 0) {
            this.taskStatus = this.wildTask[0]['status'] === 'complete' ? true : false
          }
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
        })
        .catch(() => {
          resolve({});
        });
    });
  }

}
