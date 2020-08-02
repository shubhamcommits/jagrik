import {
  Component,
  Inject,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClassService } from '../../shared/services/class.service';
import { BonusTaskService } from '../../shared/services/bonustask.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { MatOption } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-bonus-task-modal.component.html',
  styleUrls: ['./add-bonus-task-modal.component.scss']
})
export class AddBonusTaskModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder, private classService: ClassService, private utilityService: UtilityService, private storageService: StorageService, private bonusTaskService: BonusTaskService) { }

  @ViewChild('allSelected') private allSelected: MatOption;

  @Output() public getBonusTaskData = new EventEmitter<string>();
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
      students: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ])
    });
  }


  tosslePerOne(all) {
  if (this.allSelected.selected) {
    this.allSelected.deselect();
    return false;
  }
  if (this.inputForm.controls.students.value.length == this.data.teams.length){
    this.allSelected.select();
  }

}

  toggleAllSelection() {

  if (this.allSelected.selected) {
    this.inputForm.controls.students
      .patchValue([...this.data.teams.map(item => item.user_id), '0']);
  } else {
    this.inputForm.controls.students.patchValue([]);
  }
}


  addBonusTask() {
    this.validateAllFormFields(this.inputForm)
    if (this.inputForm.valid) {
      let data:any = {
        students: this.inputForm.value['students'].filter(function (val) {
          return val !== '0';
        }),
        title: this.inputForm.value['title'],
        description: this.inputForm.value['description'],
        classId: this.userData.classes[0]
      }
      return new Promise((resolve) => {
        // Call the service function
        this.bonusTaskService
          .addNewBonusTask(data)
          .then((res) => {
            resolve(res);
            // Fire sucess toast
            this.utilityService.fireToast(
              'success',
              `Bonus Task Added successfully`
            );
            this.getBonusTaskData.emit('success');
          })
          .catch(() => {
            // Fire error toast
            this.utilityService.fireToast(
              'error',
              `Some unexpected error occured, please try again!`
            );
            this.getBonusTaskData.emit('error');
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
