import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { ClassService } from '../shared/services/class.service';

export interface TeamElement {
  name: string;
  position: number;
  className: String;
  team: string;
}

export interface AssignTeamElement {
  name: string;
  _id: String;
  className: String;
}


@Component({
  selector: 'app-class-members',
  templateUrl: './class-members.component.html',
  styleUrls: ['./class-members.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class ClassMembersComponent implements OnInit {
  Mattabs;
  displayedColumns: string[] = ['position', 'name', 'className', 'team'];
  dataSource: TeamElement[] = [];
  newUser: AssignTeamElement[] = [];
  teamArray: any = [];
  teamArrayExist: boolean = false;
  userRole = '';
  className = '';
  constructor(
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;
    this.getClassDetails(
      this.storageService.getLocalData('userData').classes[0]
    );

  }

  // assignTeam(userId) {
  //   this.teamService
  //     .createTeam(
  //       this.storageService.getLocalData('userData').classes[0],
  //       userId
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       this.getTeams();
  //       this.utilityService.fireToast('success', `Successfully Assigned Team`);
  //     })
  //     .catch(() => {
  //       // Fire error toast
  //       this.utilityService.fireToast(
  //         'error',
  //         `Some unexpected error occured, please try again!`
  //       );
  //     });
  // }

  getTeams() {
    this.teamService
      .getTeams(this.storageService.getLocalData('userData').classes[0])
      .then((res) => {
        let data: any = res['teams'];
        if (data.length > 0) {
          var i = 1;
          this.dataSource = [];
          this.newUser = [];
          data.forEach((element) => {
            if (element['team_name'] !== 'No Team') {
              if (this.teamArray[element['team_name']] !== undefined) {
                this.teamArray[element['team_name']].push({
                  name: `${element['first_name']} ${element['last_name']}`,
                  position: i++,
                  className: this.className,
                  team: element['team_name'],
                  user_profile_pic: element['user_profile_pic'] !== '' && element['user_profile_pic'] !== 'default_user.png' ? 'data:image/png;base64,' + element['user_profile_pic'] : 'https://via.placeholder.com/100x100.png?text=Jagrik'
                })

              } else {
                this.teamArray[element['team_name']] = []
                this.teamArray[element['team_name']].push({
                  name: `${element['first_name']} ${element['last_name']}`,
                  position: i++,
                  className: this.className,
                  team: element['team_name'],
                  user_profile_pic: element['user_profile_pic'] !== '' && element['user_profile_pic'] !== 'default_user.png' ? 'data:image/png;base64,' + element['user_profile_pic'] : 'https://via.placeholder.com/60x60.png?text=Jagrik'
                })
              }

              this.teamArrayExist = true;

            } else {
              this.newUser.push({
                name: `${element['first_name']} ${element['last_name']}`,
                _id: element['user_id'],
                className: this.className,
              });
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
  }

  getClassDetails(classId: any) {
    return new Promise((resolve) => {

      // Fetch class details
      this.classService
        .getClassDetails(classId)
        .then((res) => {
          this.className = res['class']['name']
          this.getTeams();
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
