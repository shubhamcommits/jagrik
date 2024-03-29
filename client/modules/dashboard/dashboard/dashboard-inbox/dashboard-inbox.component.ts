import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-dashboard-inbox',
  templateUrl: './dashboard-inbox.component.html',
  styleUrls: ['./dashboard-inbox.component.scss']
})
export class DashboardInboxComponent implements OnInit {

  constructor(
    private injector: Injector
  ) { }

  userData: any

  card: any = {
    _id: '',
    description: '',
    dice_number: ''
  }

  showAssignTask = true

  async ngOnInit() {
    this.userData = await this.getUserData()
    
    if(this.userData.tasks.length > 0)
      this.card._id = this.userData.tasks[this.userData.tasks.length-1]._card
  }

  getCard(card: any){
    this.card = card
    this.card._id = card._id
    this.showAssignTask = false
    console.log(this.card)
  }

  getUserData() {
    return new Promise((resolve) => {
      const userService = this.injector.get(UserService)
      const storageService = this.injector.get(StorageService)
      userService.get()
        .then((res) => {
          storageService.setLocalData('userData', JSON.stringify(res['user']))
          resolve(res['user'])
        })
        .catch(() => {
          resolve({})
        })
    })
  }

}
