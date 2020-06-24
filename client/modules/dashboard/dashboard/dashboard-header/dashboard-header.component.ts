import { Component, OnInit, Injector } from '@angular/core'
import { AuthenticationService } from 'modules/authentication/shared/services/authentication.service'
import { StorageService } from 'src/shared/services/storage-service/storage.service'
import { Router } from '@angular/router'
import { UtilityService } from 'src/shared/services/utility-service/utility.service'

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _Router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToUserProfile() {

    // Storage Service instance
    let storageService = this._Injector.get(StorageService)

    // Fetch the user Id
    let userId = storageService.getLocalData('userData')._id

    // Navigate to router
    this._Router.navigate(['/dashboard', 'user'], {
      queryParams: {
        userId: userId
      }
    })
  }

  signOut() {

    return new Promise((resolve) => {

      // Creating auth service instance
      let authService = this._Injector.get(AuthenticationService)

      // Storage Service instance
      let storageService = this._Injector.get(StorageService)

      // Utility Service Instance
      let utilityService = this._Injector.get(UtilityService)

      // Call the service function
      authService.signOut(storageService.getLocalData('userData')._id)
        .then((res) => {

          // Resolve with sucess
          resolve(res)

          // Navigate the User to home page
          this._Router.navigate([''])

          // Fire sucess toast
          utilityService.fireToast('success', `${storageService.getLocalData('userData').first_name}, you have been logged out sucessfully!`)

          // Store the token locally
          storageService.clear()
        })
        .catch(() => {

          // Fire error toast
          utilityService.fireToast('error', `Some unexpected error occured, please try again!`)
        })
    })
  }

}
