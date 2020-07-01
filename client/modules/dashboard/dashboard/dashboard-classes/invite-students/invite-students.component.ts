import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { ClassDetailsComponent } from '../class-details/class-details.component';

@Component({
  selector: 'app-invite-students',
  templateUrl: './invite-students.component.html',
  styleUrls: ['./invite-students.component.scss']
})
export class InviteStudentsComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  // Invite Students form variable
  inviteStudentsForm: FormGroup

  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId')

  // Class Details Object
  classDetails = new ClassDetailsComponent(this._Injector, this._ActivatedRoute)

  // Class Object
  class: any

  ngOnInit() {

    // Initialise the formgroup
    this.inviteStudentsForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required, Validators.nullValidator]),
    })
  }

  async ngAfterViewInit() {

    // Fetch class details
    this.class = await this.classDetails.getClassDetails(this.classId)
  }

  onSubmit() {
    return new Promise((resolve) => {

      // Class Service instance
      let classService = this._Injector.get(ClassService)

      // Utility Service Instance
      let utilityService = this._Injector.get(UtilityService)

      classService.inviteToClass(this.inviteStudentsForm.value.email, this.classId)
        .then((res) => {
          console.log(res)
          utilityService.fireToast('success', `Invitation sent to ${this.inviteStudentsForm.value.email}`)
          this.inviteStudentsForm.reset()
          resolve()
        })
        .catch(() => {
          // Fire error toast
          utilityService.fireToast('error', `Some unexpected error occured, please try again!`)
        })

    })
  }

  clickToCopy() {

    // Utility Service Instance
    let utilityService = this._Injector.get(UtilityService)

    // Create HTML Element
    const selBox = document.createElement('textarea');

    // Set the Styles
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';

    // Set the value
    selBox.value = this.class.class_code;

    // Append the child to the body
    document.body.appendChild(selBox);

    // Append Focus and select
    selBox.focus();
    selBox.select();

    // Execute the command to copy
    document.execCommand('copy');

    // Remove the child once done
    document.body.removeChild(selBox);

    // Fire info toast
    utilityService.fireToast('info', `Copied to Clipboard`)
  }

}
