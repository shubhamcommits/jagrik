import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private injector: Injector) { }

  inputForm: FormGroup

  ngOnInit(): void {

    this.inputForm = new FormGroup({
      removablefile: new FormControl(null, [Validators.required, Validators.nullValidator])
    })
  }

  submitFile() {

    let utilityService = this.injector.get(UtilityService)

    // Fire sucess toast
    utilityService.fireToast('success', `Good Job, your task has been submitted for approval from facilitator!`, 3000)
  }

}
