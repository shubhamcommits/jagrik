import { Component, OnInit, Injector } from '@angular/core'
import { Location } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { AuthenticationService } from '../shared/services/authentication.service'
import { StorageService } from 'src/shared/services/storage-service/storage.service'
import { UtilityService } from 'src/shared/services/utility-service/utility.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ClassService } from 'modules/dashboard/dashboard/shared/services/class.service'

import { MustMatch } from '../../../src/shared/mustMatch.validator'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  styles: [`
    :host {
      display:inline-block;
       height:100%;
        width:100%;
    }
    `]
})
export class SignupComponent implements OnInit {

  constructor(
    private _Location: Location,
    private _ActivatedRoute: ActivatedRoute,
    private _Injector: Injector,
    private _Router: Router,
    private formBuilder: FormBuilder,
  ) { }

  // Sign up form variable
  signupForm: FormGroup

  role = this._ActivatedRoute.snapshot.queryParamMap.get('role');
  email = this._ActivatedRoute.snapshot.queryParamMap.get('email');
  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId');

  caste_category = 'general';

  in_school = true;
  first_step = true;
  next_step = false;

  ngOnInit(): void {

    // Initialise the formgroup
    this.signupForm =  this.formBuilder.group({
      first_name: new FormControl('', [Validators.required, Validators.nullValidator]),
      last_name: new FormControl('', [Validators.required, Validators.nullValidator]),
      email: new FormControl(this.email || '', [Validators.email, Validators.required, Validators.nullValidator]),
      password: new FormControl('', [Validators.required, Validators.nullValidator]),
      confirm_password: new FormControl('', [Validators.required, Validators.nullValidator]),
      role: new FormControl(this.role || 'facilitator', [Validators.required, Validators.nullValidator]),
    }, {
      validator: MustMatch('password', 'confirm_password')
    })

    if (this.role == 'student') {
      this.signupForm.addControl(
        'mobile_number',
        new FormControl(null, [
          Validators.nullValidator,
          Validators.pattern('^[0-9]{10}$'),
        ])
      );
      this.signupForm.addControl('date_of_birth', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('emergency_contact_name', new FormControl(null, [Validators.required, Validators.nullValidator]))

      this.signupForm.addControl(
        'emergency_contact_number',
        new FormControl(null, [
          Validators.required,
          Validators.nullValidator,Validators.pattern('^[0-9]{10}$'),
        ])
      );

      this.signupForm.addControl('block', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('district', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('state', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('religion', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('social_media_username', new FormControl(null, [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('in_school', new FormControl('', [Validators.required, Validators.nullValidator]))
      this.signupForm.addControl('caste_category', new FormControl('', [Validators.required, Validators.nullValidator]))
    }
  }

  backClicked() {
    this._Location.back()
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {


    console.log('====================================');
    console.log(this.f);
    console.log('====================================');

    if (this.signupForm.valid) {
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
            this._Router.navigate(['/dashboard', 'classes', 'list']);

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
    } else {
      this.validateAllFormFields(this.signupForm);
    }
  }

  prevStep() {
     this.first_step = true;
     this.next_step = false;
  }

  setNextStep() {


    if (this.signupForm.valid) {
      this.first_step = false;
      this.next_step = true
    } else {
      this.validateAllFormFields(this.signupForm);
      if (this.f.first_name.status !== 'INVALID' && this.f.last_name.status !== 'INVALID' && this.f.email.status !== 'INVALID' && this.f.confirm_password.status !== 'INVALID' && this.f.password.status !== 'INVALID' && this.f.role.status !== 'INVALID') {
        this.first_step = false;
        this.next_step = true;
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
}
