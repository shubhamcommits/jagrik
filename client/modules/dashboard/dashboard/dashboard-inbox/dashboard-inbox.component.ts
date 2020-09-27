import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ClassService } from '../shared/services/class.service';
import { TeamService } from '../shared/services/team.service';
import { ClassDetailsComponent } from '../dashboard-classes/class-details/class-details.component';
import {TeamMemberDetailModalComponent} from '../dashboard-inbox/team-member-detail/team-member-detail.component'
@Component({
  selector: 'app-dashboard-inbox',
  templateUrl: './dashboard-inbox.component.html',
  styleUrls: ['./dashboard-inbox.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class DashboardInboxComponent implements OnInit {
  constructor(
    private injector: Injector,
    private classService: ClassService,
    private teamService: TeamService,
    private storageService: StorageService,
    public dashboardHeaderComponent: DashboardHeaderComponent,
    public router: Router,
    public dialog: MatDialog,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  userData: any;

  is_open: Boolean = false;

  card: any = {
    _id: '',
    description: '',
    dice_number: '',
  };

  showAssignTask: Boolean = false;
  showTeam: Boolean = false;

  classId = this.storageService.getLocalData('userData').classes[0];

  class: any;

  allTeamMember: any;

  classDetails = new ClassDetailsComponent(
    this.injector,
    this._ActivatedRoute,
    this.router
  );

  async ngOnInit() {
    this.dashboardHeaderComponent.showSideMenu = false;
    this.userData = await this.getUserData();

    if (this.userData.tasks.length > 0) {
      this.card._id = this.userData.tasks[this.userData.tasks.length - 1]._card;
    }

    this.class = await this.classDetails.getClassDetails(this.classId);

    this.getTeamMembers();
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
          this.getClassDetails(res['user']['classes'][0]);
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
          this.is_open = res['class']['is_open'];
          if (this.is_open == false) {
            this.getTeams();
          }
        })
        .catch(() => {});
    });
  }

  closeClass() {
    return new Promise((resolve) => {
      // Fetch class details
      this.classService
        .closeClass(this.userData.classes[0])
        .then((res) => {
          this.getClassDetails(this.userData.classes[0]);
          resolve(res);
        })
        .catch(() => {
          resolve({});
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
              this.showTeam = true;
            }
          });
        }
      })
      .catch(() => {});
  }

  getTeamMembers() {
    this.teamService
      .getTeamMembers(this.userData.teams[0])
      .then((res) => {
        this.allTeamMember = res['teams'];
      })
      .catch(() => {});
  }

  teamMemberDetail(member: any) {
    let dialogRef = this.dialog.open(TeamMemberDetailModalComponent, {
      data: {
        member: member,
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });
  }
}