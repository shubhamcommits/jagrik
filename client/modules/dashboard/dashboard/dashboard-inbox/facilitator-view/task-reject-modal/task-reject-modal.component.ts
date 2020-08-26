import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../../../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-task-reject-modal',
  templateUrl: './task-reject-modal.component.html',
  styleUrls: ['./task-reject-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRejectModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
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

  rejectTask() {
    if (this.inputForm.valid) {
      return new Promise((resolve) => {
        // Call the service function
        this.teamService
          .rejectTask(
            this.data.team.team_id,
            0,
            this.inputForm.value['comment']
          )
          .then((res) => {
            this.getResonseData.emit('success');
            this.utilityService.fireToast(
              'success',
              `Task Rejected Successfully`
            );
          })
          .catch(() => {
            // Fire error toast
            this.getResonseData.emit('error');
          });
      });
    }
  }
}
