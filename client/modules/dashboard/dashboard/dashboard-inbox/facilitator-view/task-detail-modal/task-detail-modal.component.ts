import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../../../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private teamService: TeamService, private utilityService: UtilityService) { }

  @Output() public getResonseData = new EventEmitter<string>();

  ngOnInit(): void {
  }

  verifyTask(){
    return new Promise((resolve) => {
      // Call the service function
      this.teamService
        .assignPoint(this.data.team.team_id, this.data.team.team_task_points)
        .then((res) => {
          this.getResonseData.emit('success');
          this.utilityService.fireToast(
            'success',
            `Task Verified Successfully`
          );

        })
        .catch(() => {
          // Fire error toast
          this.getResonseData.emit('error');
        });
    });
  }

}
