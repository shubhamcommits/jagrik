import { Component, OnInit } from '@angular/core';
import { ClassService } from '../shared/services/class.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TeamElement {
  team_name: String;
  team_points: Number;
  team_members: String[];
}

@Component({
  selector: 'app-leaderboard-view',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    `,
  ],
})

export class LeaderboardViewComponent implements OnInit {
  constructor(
    private classService: ClassService,
    private storageService: StorageService,
    private utilityService: UtilityService,
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['S.No','team_name', 'team_points'];
  dataSource: TeamElement[] = [];
  userRole: any = ''

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;
    this.getCompletedTeam(
      this.storageService.getLocalData('userData').classes[0]
    );
  }

  getCompletedTeam(classId) {
    this.dataSource = []
    return new Promise((resolve) => {
      // Call the service function
      this.classService
        .getCompletedTaskTeam(classId)
        .then((res) => {
          var data: any = res;
          this.dataSource = [];
          data.tasks.forEach(element => {
            let teammebername = [];
            element.team_members_tasks.forEach(element1 => {
              teammebername.push(element1.user_name)
            });

            this.dataSource.push({
              team_name: `${element['team_name']}`,
              team_points: element['team_points'],
              team_members: teammebername
            });
          })

            // Fire sucess toast
            this.utilityService.fireToast(
              'success',
              `Data fetched successfully`
            );
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
