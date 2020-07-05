import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UserService } from '../../shared/services/user.service';
import { TeamService } from '../../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

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

  // Card Output Event Emitter
  @Output('card') card = new EventEmitter()

  ngOnInit(): void {
  }

  assignCard() {
    return new Promise((resolve) => {

      // User Service Instance
      let teamService = this.injector.get(TeamService)

      let utilityService = this.injector.get(UtilityService)

      teamService.assignCard(this.theme, this.week, this.getUserData().teams[0])
        .then((res) => {
          console.log(res)
          this.card.emit(res['card'])
          this.showChooseTheme = !this.showChooseTheme

          // Fire sucess toast
          utilityService.fireToast('success', `Great - you've assigned a new card to yourself - your feed will update very soon!`)
          
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
