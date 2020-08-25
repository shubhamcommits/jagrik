import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { TeamService } from '../shared/services/team.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
        padding-top: 40px;
      }
    `,
  ],
})
export class TasksBoardComponent implements OnInit {
  constructor(private injector: Injector, private teamService: TeamService) {}

  userData: any;
  week: any = 1;

  card: any = {
    _id: '',
    description: '',
    dice_number: ''
  };

  showAssignTask = true;

  async ngOnInit() {
    this.userData = await this.getUserData();

    if (this.userData.tasks.length > 0){
      this.card._id = this.userData.tasks[
        this.userData.tasks.length - 1
      ]._card;
      this.getTeamTaskStatus();
    }
  }

  getCard(card: any) {
    this.card = card;
    this.card._id = card._id;
    this.showAssignTask = false;
    console.log(this.card);
    this.getUserData();
  }

  getUserData() {
    return new Promise((resolve) => {
      const userService = this.injector.get(UserService);
      const storageService = this.injector.get(StorageService);
      userService
        .get()
        .then((res) => {
          storageService.setLocalData('userData', JSON.stringify(res['user']));
          resolve(res['user']);
        })
        .catch(() => {
          resolve({});
        });
    });
  }

  getTeamTaskStatus() {
     return new Promise((resolve) => {
       const userService = this.injector.get(UserService);
       this.teamService
         .teamTaskStatus(this.userData.teams[0]._id)
         .then((res) => {
           if (res['response']['status'] === false) {
             this.showAssignTask = false;
           } else {
             this.showAssignTask = true;
             this.week = res['response']['week'];
           }
         })
         .catch(() => {
           resolve({});
         });
     });
  }
}
