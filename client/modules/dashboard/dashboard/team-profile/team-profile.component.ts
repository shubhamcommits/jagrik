import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { ClassService } from '../shared/services/class.service';


@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class TeamProfileComponent implements OnInit {
  constructor(
    private teamService?: TeamService,
    private utilityService?: UtilityService,
    private storageService?: StorageService,
    private classService?: ClassService
  ) {}

  ngOnInit(): void {}
}
