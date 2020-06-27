import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public utilityService: UtilityService,
  ) { }

  routerState = 'sign-in'

  ngOnInit(): void {
  }

  /**
   * This function opens the Swal modal
   * @param title 
   * @param imageUrl 
   */
  openModal(title: string) {
    return this.utilityService.getSwalModal({
      title: title,
      html:
        '<input id="email" class="swal2-input" type="email" required placeholder="Please provide your email">' +
        '<input id="password" class="swal2-input" type="password" required placeholder="Please provide your new password">' + 
        '<input id="confirm-password" class="swal2-input" type="text" required placeholder="Confirm your new password">',
      focusConfirm: false,
      preConfirm: () => {
        // if(document.getElementById('confirm-password')['value'] === document.getElementById('password')['value'])
          return [
            document.getElementById('email')['value'],
            document.getElementById('password')['value']
          ]
      },
      imageAlt: title,
      confirmButtonText: title,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
    })
  }

  /**
   * This function creates the new normal class
   */
  async openResetPasswordModal() {
    const { value: value } = await this.openModal('Reset your password!');
    if (value) {
      console.log(value)
    } else if (value == '') {
      this.utilityService.fireToast('warning', 'Email can\'t be empty!', 3000);
    }
  }

}
