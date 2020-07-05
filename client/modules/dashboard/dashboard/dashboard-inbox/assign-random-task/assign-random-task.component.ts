import { Component, OnInit, Injector } from '@angular/core';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-assign-random-task',
  templateUrl: './assign-random-task.component.html',
  styleUrls: ['./assign-random-task.component.scss']
})
export class AssignRandomTaskComponent implements OnInit {

  constructor(
    private injector: Injector
  ) { }

  // Show Choose theme
  showChooseTheme = false

  // Theme Variable
  theme = 'fundamental duties'

  // Week Variable
  week = 1

  ngOnInit(): void {
  }

  assignCard() {
    return new Promise((resolve) => {

      // User Service Instance
      let userService = this.injector.get(UserService)

      userService.assignCard(this.theme, this.week)
        .then((res) => {
          this.setUserData(res['user'])
          resolve()
        })
        .catch(() => resolve())
    })
  }

  getUserData() {
    const storageService = this.injector.get(StorageService)
    return storageService.getLocalData('userData')
  }

  setUserData(userData: any) {
    const storageService = this.injector.get(StorageService)
    storageService.setLocalData('userData', JSON.stringify(userData))
  }

}
