import { Component, OnInit, Injector } from '@angular/core';
import { ClassDetailsComponent } from '../class-details/class-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-class-members',
  templateUrl: './class-members.component.html',
  styleUrls: ['./class-members.component.scss']
})
export class ClassMembersComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) { }

  // Class Details Object
  classDetails = new ClassDetailsComponent(this._Injector, this._ActivatedRoute, this._Router)

  // Class Object
  class: any

  // Fetch class from the route
  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId')

  async ngOnInit() {
    this.class = await this.classDetails.getClassDetails(this.classId)
  }

  isClassCreator() {

    // Utility Service Instance
    let utilityService = this._Injector.get(UtilityService)

    // Fire info toast
    utilityService.fireToast('info', `This user is your class creator!`)
  }

}
