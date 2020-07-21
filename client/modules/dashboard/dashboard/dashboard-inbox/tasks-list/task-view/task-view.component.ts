import { Component, Inject, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FileValidator } from 'ngx-material-file-input';
import { TeamService } from '../../../shared/services/team.service';
 import { StorageService } from 'src/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private injector: Injector,
    private storageService: StorageService
  ) { }

  @Output() public getResonseData = new EventEmitter<string>();

  inputForm: FormGroup;
  userData: any = [];

  ngOnInit(): void {
    this.userData = this.storageService.getLocalData('userData');


    this.inputForm = new FormGroup({
      removablefile: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
        FileValidator.maxContentSize(1048576),
      ]),
    });
  }

  submitFile() {
    let utilityService = this.injector.get(UtilityService);

    return new Promise((resolve) => {
      // Call the service function
      const teamService = this.injector.get(TeamService);
      teamService
        .uploadTaskDocument(
          this.inputForm.value['removablefile']['files'][0],
          this.userData.teams[0]._id,
          this.data.task._id
        )
        .then((res) => {
          // Fire sucess toast
         utilityService.fireToast(
           'success',
           `Document uploaded successfully !`
         );
          this.getResonseData.emit('success');
        })
        .catch(() => {
          // Fire error toast
          utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
          this.getResonseData.emit('error');
        });
    });
  }
}
