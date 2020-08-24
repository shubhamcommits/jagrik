import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ClassService } from '../shared/services/class.service';
import { TeamService } from '../shared/services/team.service';
@Component({
  selector: 'app-dashboard-inbox',
  templateUrl: './dashboard-inbox.component.html',
  styleUrls: ['./dashboard-inbox.component.scss'],
})
export class DashboardInboxComponent implements OnInit {
  constructor(
    private injector: Injector,
    private classService: ClassService,
    private teamService: TeamService,
    public dashboardHeaderComponent: DashboardHeaderComponent
  ) { }



  userData: any;

  is_open: Boolean = false

  card: any = {
    _id: '',
    description: '',
    dice_number: '',
  };

  showAssignTask: Boolean = false;
  showTeam: Boolean = false;

  async ngOnInit() {
    this.dashboardHeaderComponent.showSideMenu = false
    this.userData = await this.getUserData();
    if (this.userData.tasks.length > 0)
      this.card._id = this.userData.tasks[this.userData.tasks.length - 1]._card;
  }

  public ngOnDestroy() {
    this.dashboardHeaderComponent.showSideMenu = true;
  }

  getCard(card: any) {
    this.card = card;
    this.card._id = card._id;
    this.showAssignTask = false;
    console.log(this.card);
  }

  getUserData() {
    return new Promise((resolve) => {
      const userService = this.injector.get(UserService);
      const storageService = this.injector.get(StorageService);
      userService
        .get()
        .then((res) => {
          this.getClassDetails(res['user']['classes'][0])
          storageService.setLocalData('userData', JSON.stringify(res['user']));
          resolve(res['user']);
        })
        .catch(() => {
          resolve({});
        });
    });
  }

  getClassDetails(classId: any) {
    return new Promise((resolve) => {
      // Fetch class details
      this.classService
        .getClassDetails(classId)
        .then((res) => {
          this.is_open = res['class']['is_open']
          if (this.is_open == false) {
            this.getTeams()
          }
        })
        .catch(() => {
        });
    });
  }

  getTeams() {
    this.teamService
      .getTeams(this.userData.classes[0])
      .then((res) => {
        let data: any = res['teams'];
        if (data.length > 0) {
          var i = 1;
          data.forEach((element) => {
            if (element['team_name'] !== 'No Team') {

            } else {
              this.showTeam = true
            }
          });
        }
      })
      .catch(() => {
      });
  }
}
