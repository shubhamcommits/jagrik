import { Component, OnInit, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../../../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TaskRejectModalComponent } from '../task-reject-modal/task-reject-modal.component';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { Router } from '@angular/router';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as $ from 'jquery';
import * as sl from '../../../../../../src/assets/slider.js';


declare var nextImage;
declare var prevImage;
@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class TaskDetailModalComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    public dialog: MatDialog,
    public storageService: StorageService,
    public router: Router
  ) {}
  formGroup = new FormGroup({ secondCtrl: new FormControl(''), })

  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  public data: any = [];
  public comment: string = '';
  public bonus_point: any = '';
  public userData:any = [];
  public confetti: boolean= false;
  ngOnInit(): void {
    this.data.team = this.storageService.getLocalData('team_task_detail');
    console.log('====================================');
    console.log(this.data.team );
    console.log('====================================');
    this.userData = this.storageService.getLocalData('userData');
    this.inputForm = this.formBuilder.group({
      comment: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      bonus_point: new FormControl(0),
    });
    $(function(){

      $('#thumbnail li').click(function(){
        var thisIndex = $(this).index()

        if(thisIndex < $('#thumbnail li.active').index()){
          prevImage(thisIndex, $(this).parents("#thumbnail").prev("#image-slider"));
          // alert('previous image clicked');
        }else if(thisIndex > $('#thumbnail li.active').index()){
          nextImage(thisIndex, $(this).parents("#thumbnail").prev("#image-slider"));
          // alert('next image clicked');
        }

        $('#thumbnail li.active').removeClass('active');
        $(this).addClass('active');

        });
      });
  }


  verifyTask() {
    return new Promise((resolve) => {
      // Call the service function
      this.teamService
        .assignPoint(
          this.data.team.team_id,
          parseInt(this.data.team.team_task_points) +
            parseInt(this.inputForm.value.bonus_point),
          this.inputForm.value.comment,
          this.inputForm.value.bonus_point,
          this.data.team.task_id
        )
        .then((res) => {
          this.router.navigate(['dashboard', 'inbox']);
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

  removeSpace(text) {
    return text.split(/\s/).join('')
  }
}
