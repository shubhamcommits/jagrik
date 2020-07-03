import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

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
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  styles: [`
    :host {
      display:inline-block;
       width:100%;
    }
    `]
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'className', 'team'];
  dataSource: TeamElement[] = [];
  newUser: AssignTeamElement[] = [];
  userRole = ''


  constructor(private teamService: TeamService, private utilityService: UtilityService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role
    this.getTeams()
  }

  assignTeam(userId) {
    this.teamService.createTeam(this.storageService.getLocalData('userData').classes[0], userId).then((res) => {
      console.log(res)
      this.getTeams()
      this.utilityService.fireToast('success', `Successfully Assigned Team`)
    }).catch(() => {
      // Fire error toast
      this.utilityService.fireToast('error', `Some unexpected error occured, please try again!`)
    })
  }

  getTeams() {

    this.teamService.getTeams(this.storageService.getLocalData('userData').classes[0]).then((res) => {
      console.log(res)
      let data: any = res['teams'];
      if (data['members'].length > 0) {
        var i = 0;
        this.dataSource = [];
        this.newUser = [];
        data['members'].forEach(element => {

          if ("0" in element['teams'] == true) {
            this.dataSource.push({
              name: `${element['first_name']} ${element['last_name']}`,
              position: i++,
              className: data['name'],
              team: element['teams']['0'],
            })
          } else {
            this.newUser.push({
              name: `${element['first_name']} ${element['last_name']}`,
              _id: element['_id'],
              className: data['name']
            })
          }

        });

      }

    })
      .catch(() => {
        // Fire error toast
        this.utilityService.fireToast('error', `Some unexpected error occured, please try again!`)
      })
  }

}
