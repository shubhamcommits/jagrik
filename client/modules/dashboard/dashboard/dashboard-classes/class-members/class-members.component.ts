import { Component, OnInit, Injector } from '@angular/core';
import { ClassDetailsComponent } from '../class-details/class-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-class-members',
  templateUrl: './class-members.component.html',
  styleUrls: ['./class-members.component.scss']
})
export class ClassMembersComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _ActivatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private _Router: Router
  ) { }

  // Class Details Object
  classDetails = new ClassDetailsComponent(this._Injector, this._ActivatedRoute, this._Router)

  // Class Object
  class: any

  userData: any;
  // userTeam: any;

  // Fetch class from the route
  classId = this.storageService.getLocalData('userData').classes[0];
  userTeam = this.storageService.getLocalData('userData').teams[0]._id;
  displayedColumns: string[] = ['Name', 'Email', 'Role'];
  dataSource = ELEMENT_DATA;
  
  async ngOnInit() {
    this.class = await this.classDetails.getClassDetails(this.classId);
    console.log(this.userTeam);
  }

  isClassCreator() {

    // Utility Service Instance
    let utilityService = this._Injector.get(UtilityService)

    // Fire info toast
    utilityService.fireToast('info', `This user is your class creator!`)
  }

}