import { Component, Inject, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FileValidator } from 'ngx-material-file-input';
import { UserService } from '../../shared/services/user.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-add-wild-task',
  templateUrl: './add-wild-task.component.html',
  styleUrls: ['./add-wild-task.component.scss'],
})
export class AddWildTaskComponent implements OnInit {
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
      description: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }

  submitFile() {
    let utilityService = this.injector.get(UtilityService);

    return new Promise((resolve) => {
      // Call the service function
      const userService = this.injector.get(UserService);
      userService
        .uploadWildTaskDocument(
          this.inputForm.value['removablefile']['files'][0],
          this.data.task._id,
          this.inputForm.value['description'],
          this.data.task.description,
          this.data.task.title
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
