import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

export interface PeriodicElement {
  name: string;
  position: number;
  className: number;
  team: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', className: 1.0079, team: 'H' },
  { position: 2, name: 'Helium', className: 4.0026, team: 'He' },
  { position: 3, name: 'Lithium', className: 6.941, team: 'Li' },
  { position: 4, name: 'Beryllium', className: 9.0122, team: 'Be' },
  { position: 5, name: 'Boron', className: 10.811, team: 'B' },
  { position: 6, name: 'Carbon', className: 12.0107, team: 'C' },
  { position: 7, name: 'Nitrogen', className: 14.0067, team: 'N' },
  { position: 8, name: 'Oxygen', className: 15.9994, team: 'O' },
  { position: 9, name: 'Fluorine', className: 18.9984, team: 'F' },
  { position: 10, name: 'Neon', className: 20.1797, team: 'Ne' },
];


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  styles: [`
    :host {
      display:inline-block;
       width:100%;
    }
    `]
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'className', 'team'];
  dataSource = ELEMENT_DATA;
  userRole = ''

  constructor(private teamService: TeamService, private utilityService: UtilityService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role
    this.getTeams()
  }

  assignTeam() {

  }

  getTeams() {

    this.teamService.getTeams(this.storageService.getLocalData('userData').classes[0])
  }

}