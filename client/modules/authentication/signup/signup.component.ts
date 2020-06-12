import { Component, OnInit, Injector } from '@angular/core'
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthenticationService } from '../shared/services/authentication.service'
import { StorageService } from 'src/shared/services/storage-service/storage.service'
import { UtilityService } from 'src/shared/services/utility-service/utility.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private _Location: Location,
    private _Injector: Injector
  ) { }

  // Sign up form variable
  signupForm: FormGroup

  ngOnInit(): void {

    // Initialise the formgroup
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.nullValidator]),
      last_name: new FormControl(null, [Validators.required, Validators.nullValidator]),
      email: new FormControl(null, [Validators.email, Validators.required, Validators.nullValidator]),
      password: new FormControl(null, [Validators.required, Validators.nullValidator]),
      confirm_password: new FormControl(null, [Validators.required, Validators.nullValidator]),
    })
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

      // Call the service function
      authService.signUp(this.signupForm.value)
      .then((res) => {

        // Store the user data locally
        storageService.setLocalData('userData', JSON.stringify(res['user']))

        // Store the token locally
        storageService.setLocalData('authToken', JSON.stringify(res['token']))

        // Resolve with sucess
        resolve(res)

        // Fire sucess toast
        utilityService.fireToast('success', `Welcome back to Jagrik - ${res['user']['first_name']}`)
      })
      .catch(() => {

        // Fire error toast
        utilityService.fireToast('error', `Some unexpected error occured, please try again!`)
      })
    })
  }
}
