import { Component, OnInit, Injector } from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthenticationService } from '../shared/services/authentication.service'
import { StorageService } from 'src/shared/services/storage-service/storage.service'
import { UtilityService } from 'src/shared/services/utility-service/utility.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ClassService } from 'modules/dashboard/dashboard/shared/services/class.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private _Location: Location,
    private _ActivatedRoute: ActivatedRoute,
    private _Injector: Injector,
    private _Router: Router
  ) { }

  // Sign up form variable
  signupForm: FormGroup

  role = this._ActivatedRoute.snapshot.queryParamMap.get('role');
  email = this._ActivatedRoute.snapshot.queryParamMap.get('email');
  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId');

  caste_category = 'general';

  in_school = true;

  ngOnInit(): void {

    // Initialise the formgroup
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.nullValidator]),
      last_name: new FormControl(null, [Validators.required, Validators.nullValidator]),
      email: new FormControl(this.email || null, [Validators.email, Validators.required, Validators.nullValidator]),
      password: new FormControl(null, [Validators.required, Validators.nullValidator]),
      confirm_password: new FormControl(null, [Validators.required, Validators.nullValidator]),
      role: new FormControl(this.role || 'facilitator', [Validators.required, Validators.nullValidator]),
    })

    if(this.role == 'student'){
      this.signupForm.addControl('mobile_number', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('date_of_birth', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('emergency_contact_name', new FormControl(null, [Validators.required, Validators.nullValidator]))
      
      this.signupForm.addControl('emergency_contact_number', new FormControl(null, [Validators.required, Validators.nullValidator]))

      this.signupForm.addControl('block', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('district', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('state', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('religion', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('social_media_username', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('in_school', new FormControl(this.in_school, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('caste_category', new FormControl(this.caste_category, [Validators.required, Validators.nullValidator]))
    }
  }

  backClicked() {
    this._Location.back()
  }

  onSubmit() {
    return new Promise((resolve) => {

      // Creating auth service instance
      let authService = this._Injector.get(AuthenticationService)

      // Storage Service instance
      let storageService = this._Injector.get(StorageService)

      // Utility Service Instance
      let utilityService = this._Injector.get(UtilityService)

      // Class Service Instance
      let classService = this._Injector.get(ClassService)

      // Call the service function
      authService.signUp(this.signupForm.value)
        .then((res) => {

          // Store the user data locally
          storageService.setLocalData('userData', JSON.stringify(res['user']))

          // Store the token locally
          storageService.setLocalData('authToken', JSON.stringify(res['token']))

          if (this.classId) {

            res['user'].classes = [this.classId]

            // Store the user data locally
            storageService.setLocalData('userData', JSON.stringify(res['user']))

            classService.joinToClass(this.classId)
              .then((res) => console.log(res))
          }

          // Navigate the User to main dashboard
          this._Router.navigate(['/dashboard', 'inbox'])

          // Resolve with sucess
          resolve(res)

          // Fire sucess toast
          utilityService.fireToast('success', `Welcome to Jagrik - ${res['user']['first_name']}`)
        })
        .catch(() => {

          // Fire error toast
          utilityService.fireToast('error', `Some unexpected error occured, please try again!`)
        })
    })
  }
}
