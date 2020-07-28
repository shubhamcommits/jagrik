import {
  Component,
  Inject,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
@Component({
  selector: 'app-add-announcement-modal',
  templateUrl: './add-announcement-modal.component.html',
  styleUrls: ['./add-announcement-modal.component.scss']
})
export class AddAnnouncementModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private announcementService: AnnouncementService, private utilityService: UtilityService, private storageService: StorageService) { }
  @Output() public getResonseData = new EventEmitter<string>();
  inputForm: FormGroup;
  userData: any = [];

  ngOnInit(): void {
    this.userData = this.storageService.getLocalData('userData');
    this.inputForm = this.formBuilder.group({
      title: new FormControl(this.data.type == 'edit' ? this.data.detail.title : '', [
        Validators.required,
        Validators.nullValidator,
      ]),
      description: new FormControl(this.data.type == 'edit' ? this.data.detail.description : '', [
        Validators.required,
        Validators.nullValidator,
      ])
    });
  }

  addAnnouncement() {
    this.validateAllFormFields(this.inputForm)
    if (this.inputForm.valid) {

      return new Promise((resolve) => {
        // Call the service function
        this.announcementService
          .addNewAnnouncement(this.inputForm.value['description'], this.inputForm.value['title'], this.userData.classes[0])
          .then((res) => {
            resolve(res);

            // Fire sucess toast
            this.utilityService.fireToast(
              'success',
              `Announcement Added successfully`
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

  updateAnnouncement() {
    this.validateAllFormFields(this.inputForm)
    if (this.inputForm.valid) {

      return new Promise((resolve) => {
        // Call the service function
        this.announcementService
          .updateAnnouncement(this.inputForm.value['description'], this.inputForm.value['title'], this.data.detail.announcement_class, this.data.detail._id)
          .then((res) => {
            resolve(res);

            // Fire sucess toast
            this.utilityService.fireToast(
              'success',
              `Announcement updated successfully`
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
