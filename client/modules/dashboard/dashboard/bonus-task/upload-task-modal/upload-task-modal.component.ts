import { Component, Inject, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FileValidator } from 'ngx-material-file-input';
import { BonusTaskService } from '../../shared/services/bonustask.service';
 import { StorageService } from 'src/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-upload-task-modal',
  templateUrl: './upload-task-modal.component.html',
  styleUrls: ['./upload-task-modal.component.scss'],
})
export class UploadTaskModalComponent implements OnInit {
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
      const teamService = this.injector.get(BonusTaskService);
      teamService
        .submitBonusTaskResponse(
          this.inputForm.value['removablefile']['files'][0],
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
