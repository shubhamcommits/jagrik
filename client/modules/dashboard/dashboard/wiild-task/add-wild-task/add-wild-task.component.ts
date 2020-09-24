import { Component, Inject, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { FileValidator } from 'ngx-material-file-input';
import { TeamService } from '../../shared/services/team.service';
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
      removablefile1: new FormControl(null, [
        FileValidator.maxContentSize(1048576),
      ]),
      removablefile2: new FormControl(null, [
        FileValidator.maxContentSize(1048576),
      ]),
      removablefile3: new FormControl(null, [
        FileValidator.maxContentSize(1048576),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      answer2: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      answer3: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      answer3text: new FormControl(''),
    });
  }

  get f() {
    return this.inputForm.controls;
  }

  submitFile() {

    if (this.inputForm.valid) {

      let image = []
      image.push(this.inputForm.value['removablefile']['files'][0]);
      if (this.inputForm.value['removablefile1']) {
        image.push(this.inputForm.value['removablefile1']['files'][0]);
      }
      if (this.inputForm.value['removablefile2']) {
        image.push(this.inputForm.value['removablefile2']['files'][0]);
      }
      if (this.inputForm.value['removablefile3']) {
        image.push(this.inputForm.value['removablefile3']['files'][0]);
      }
      let utilityService = this.injector.get(UtilityService);

      return new Promise((resolve) => {
        // Call the service function
        const teamService = this.injector.get(TeamService);
        teamService
          .uploadTaskDocument(
            image,
            this.userData.teams[0]._id,
            this.data.task._id,
            [
              {
                question: 'Please explain how you completed the task?',
                answer: this.inputForm.value['description'],
              },
              {
                question: 'What was your takeaway from this task?',
                answer: this.inputForm.value['answer2'],
              },
              {
                question: 'Did you take help from any other team?',
                answer:
                  this.inputForm.value['answer3'] === 'Yes'
                    ? this.inputForm.value['answer3text']
                    : 'No',
              },
            ]
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
}
