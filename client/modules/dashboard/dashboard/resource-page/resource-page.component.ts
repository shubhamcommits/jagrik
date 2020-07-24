import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/services/team.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { ClassService } from '../shared/services/class.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddModalComponent } from './add-modal/app-add-modal.component';

export interface ResourceElement {
  name: string;
  description: number;
  image: String;
  file: string;
  action: string;
}

@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class ResourcePageComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'image',
    'file',
    'action',
  ];
  dataSource: ResourceElement[] = [];
  userRole = '';
  className = '';

  constructor(
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    private classService: ClassService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;
  }

  openDialog(team: any) {
    let dialogRef = this.dialog.open(AddModalComponent, {
      data: {
        team,
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });
  }
}
