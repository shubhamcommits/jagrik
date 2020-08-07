import { Component, OnInit, Injector, Output, Input, EventEmitter } from '@angular/core';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { TeamService } from '../../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-assign-random-task',
  templateUrl: './assign-random-task.component.html',
  styleUrls: ['./assign-random-task.component.scss'],
})
export class AssignRandomTaskComponent implements OnInit {
  constructor(private injector: Injector) {}

  // Show Choose theme
  showChooseTheme = false;

  // Show assign card
  showAssignCard = true;

  // Theme Variable
  theme = 'fundamental duties';

  // Card Output Event Emitter
  @Output('card') card = new EventEmitter();
  // Week Variable
  @Input('week') week: any;

  ngOnInit(): void {}

  assignCard() {
    return new Promise((resolve) => {
      // User Service Instance
      let teamService = this.injector.get(TeamService);

      let utilityService = this.injector.get(UtilityService);

      teamService
        .assignCard(this.theme, this.week, this.getUserData().teams[0]._id)
        .then((res) => {
          console.log(res);
          this.card.emit(res['card']);
          this.showChooseTheme = !this.showChooseTheme;
          this.showAssignCard = !this.showAssignCard;

          // Fire sucess toast
          utilityService.fireToast(
            'success',
            `Great - you've assigned a new card to your team - your feed will update very soon!`,
            3000
          );

          resolve();
        })
        .catch(() => {
          utilityService.fireToast(
            'info',
            `Seems like your other team partner has already assigned a card to your team, please check the dashboard in a while!`,
            3000
          );
          this.showChooseTheme = !this.showChooseTheme;
          this.showAssignCard = !this.showAssignCard;
          resolve();
        });
    });
  }

  getUserData() {
    const storageService = this.injector.get(StorageService);
    return storageService.getLocalData('userData');
  }

  setUserData(userData: any) {
    const storageService = this.injector.get(StorageService);
    storageService.setLocalData('userData', JSON.stringify(userData));
  }
}
