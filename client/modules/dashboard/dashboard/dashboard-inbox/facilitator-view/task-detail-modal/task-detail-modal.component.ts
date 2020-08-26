import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../../../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TaskRejectModalComponent } from '../task-reject-modal/task-reject-modal.component';
@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    public dialog: MatDialog
  ) {}

  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      comment: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }

  verifyTask() {
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

  rejectTask() {
    let dialogRef = this.dialog.open(TaskRejectModalComponent, {
      data: {
        team: this.data?.team,
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });
    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close();
    });
    this.getResonseData.emit('error');
  }
}
