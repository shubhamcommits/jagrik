import { TeamComponent } from './../team/team.component';
import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ClassDetailsComponent } from '../dashboard-classes/class-details/class-details.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-inbox',
  templateUrl: './dashboard-inbox.component.html',
  styleUrls: ['./dashboard-inbox.component.scss'],
})
export class DashboardInboxComponent implements OnInit {
  constructor(
    private injector: Injector,
    public dashboardHeaderComponent: DashboardHeaderComponent,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) { }

  classDetails = new ClassDetailsComponent(
    this.injector,
    this._ActivatedRoute,
    this._Router
  );

  teamComponent = new TeamComponent();


  userData: any;

  is_open: Boolean = false

  card: any = {
    _id: '',
    description: '',
    dice_number: '',
  };

  showAssignTask:Boolean = false;


  async ngOnInit() {
    this.is_open = this.classDetails.isOpen
    this.userData = await this.getUserData();
    this.dashboardHeaderComponent.showSideMenu = false;
    this.showAssignTask = this.teamComponent.newUser.length > 0 ? true : false
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
          storageService.setLocalData('userData', JSON.stringify(res['user']));
          resolve(res['user']);
        })
        .catch(() => {
          resolve({});
        });
    });
  }
}
