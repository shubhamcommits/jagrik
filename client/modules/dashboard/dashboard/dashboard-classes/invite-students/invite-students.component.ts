import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

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

  classId = this._ActivatedRoute.snapshot.paramMap.get('id')

  ngOnInit(): void {

    // Initialise the formgroup
    this.inviteStudentsForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required, Validators.nullValidator]),
    })
  }

  onSubmit() {
    return new Promise((resolve) => {

      // Class Service instance
      let classService = this._Injector.get(ClassService)

      // Utility Service Instance
      let utilityService = this._Injector.get(UtilityService)

      classService.inviteToClass(this.inviteStudentsForm.value.email, this.classId)
        .then((res)=>{
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

}
