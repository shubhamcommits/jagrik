import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { ClassService } from '../shared/services/class.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private teamService?: TeamService,
    private utilityService?: UtilityService,
    private storageService?: StorageService,
    private classService?: ClassService
  ) {}

  teamData: any = [];
  teamId = '';
  ngOnInit(): void {
    this.teamId = this.activatedRoute.snapshot.params['teamId'];
    this.getTeamProfile(this.activatedRoute.snapshot.params['teamId']);
  }

  getTeamProfile(teamId) {
    return new Promise((resolve) => {
      // Fetch class details
      this.teamService
        .teamProfile(teamId)
        .then((res) => {
          // Fire error toast
          this.teamData = res['response'];
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }
}
