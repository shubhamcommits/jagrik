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
  resourceData: any = [];

  constructor(
    private teamService: TeamService,
    private utilityService: UtilityService,
    private storageService: StorageService,
    private classService: ClassService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.userRole = this.storageService.getLocalData('userData').role;
    this.getResourceFile()
  }

  openDialog(team: any) {
    let dialogRef = this.dialog.open(AddModalComponent, {
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '60vw',
    });

    dialogRef.componentInstance.getResonseData.subscribe(($e) => {
      dialogRef.close()
      this.getResourceFile()
    });
  }

  getResourceFile() {
    return new Promise((resolve) => {
      // Create class service instance

      // Fetch class details
      this.classService
        .getClassDetails(this.storageService.getLocalData('userData').classes[0])
        .then((res) => {
          this.resourceData = res['class']['files']
        })
        .catch(() => {
          this.utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }
}
