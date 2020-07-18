import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../shared/services/class.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

export interface TeamElement {
  team_id: string;
  team_name: String;
  team_status: String;
}
@Component({
  selector: 'app-facilitator-view',
  templateUrl: './facilitator-view.component.html',
  styleUrls: ['./facilitator-view.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class FacilitatorViewComponent implements OnInit {
  constructor(
    private classService: ClassService,
    private storageService: StorageService,
    private utilityService: UtilityService
  ) {}

  is_completedTask = false;
  displayedColumns: string[] = ['team_id', 'team_name', 'team_status'];
  dataSource: TeamElement[] = [];

  ngOnInit(): void {
    this.getCompletedTeam(
      this.storageService.getLocalData('userData').classes[0]
    );
  }

  getCompletedTeam(classId) {
    return new Promise((resolve) => {
      // Call the service function
      this.classService
        .getCompletedTaskTeam(classId)
        .then((res) => {
          var data: any = res;
          data.tasks.forEach(element => {
            if (element['team_status'] === 'completed'){
            this.dataSource.push({
              team_id:
                element['team_id'],
              team_name:
                element[
                  'team_name'
                ],
              team_status:
                element[
                  'team_status'
                ],
            });
          }
          });

          if (this.dataSource.length > 0) {
            this.is_completedTask = true;
          }
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
