import {
  Component,
  Inject,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClassService } from '../../shared/services/class.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
@Component({
  selector: 'app-add-modal',
  templateUrl: './app-add-modal.component.html',
  styleUrls: ['./app-add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private classService: ClassService, private utilityService: UtilityService, private storageService: StorageService) { }
  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  userData: any = [];

  ngOnInit(): void {
    this.userData = this.storageService.getLocalData('userData');
    this.inputForm = this.formBuilder.group({
      title: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      upload_file: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }

  addResource() {
    this.validateAllFormFields(this.inputForm)
    if (this.inputForm.valid) {

      return new Promise((resolve) => {
        // Call the service function
        this.classService
          .addNewResource(this.inputForm.value['upload_file'].files[0], this.inputForm.value['image'].files[0], this.inputForm.value['description'], this.inputForm.value['title'], this.userData.classes[0])
          .then((res) => {
            resolve(res);

            // Fire sucess toast
            this.utilityService.fireToast(
              'success',
              `Profile updated successfully`
            );
            this.getResonseData.emit('success');
          })
          .catch(() => {
            // Fire error toast
            this.utilityService.fireToast(
              'error',
              `Some unexpected error occured, please try again!`
            );
            this.getResonseData.emit('error');
          });
      });
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
}
