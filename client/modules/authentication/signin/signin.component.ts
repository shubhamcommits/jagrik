import { Component, OnInit, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private _Location: Location,
    private _Injector: Injector,
    private _Router: Router
  ) { }

  // Form Group
  loginForm: FormGroup

  ngOnInit(): void {

    // Initialise the formgroup
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required, Validators.nullValidator]),
      password: new FormControl(null, [Validators.required, Validators.nullValidator]),
    })
  }

  backClicked() {
    this._Location.back();
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
      authService.signIn(this.loginForm.value)
        .then((res) => {

          // Store the user data locally
          storageService.setLocalData('userData', JSON.stringify(res['user']))

          // Store the token locally
          storageService.setLocalData('authToken', JSON.stringify(res['token']))

          // Navigate the User to main dashboard
          this._Router.navigate(['/dashboard', 'inbox'])

          // Resolve with sucess
          resolve(res)

          // Fire sucess toast
          utilityService.fireToast('success', `Welcome back - ${res['user']['first_name']}`)
        })
        .catch(() => {
          // Fire error toast
          utilityService.fireToast('error', `Your email or password seems to be wrong!`)
        })
    })
  }

}
