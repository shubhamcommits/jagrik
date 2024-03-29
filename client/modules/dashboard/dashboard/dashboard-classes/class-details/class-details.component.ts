import { Component, OnInit, Injector } from '@angular/core';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {

  public class: any;

  constructor(
    private _Injector: Injector,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {

  }

  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId');



  async ngOnInit() {
    this.class = await this.getClassDetails(this.classId);
  }

  checkColor(btnName) {
    if (
      this._Router.url.includes('dashboard/classes/agenda') &&
      btnName == 'Agenda'
    ) {
      return 'primary';
    } else if (
      this._Router.url.includes('dashboard/classes/members') &&
      btnName == 'Members'
    ) {
      return 'primary';
    } else if (
      this._Router.url.includes('dashboard/classes/invite') &&
      btnName == 'Invite'
    ) {
      return 'primary';
    } else {
      return 'basic';
    }
  }

  getClassDetails(classId: any) {
    return new Promise((resolve) => {
      // Create class service instance
      let classService = this._Injector.get(ClassService);

      // Fetch class details
      classService
        .getClassDetails(classId)
        .then((res) => {
          resolve(res['class'] || {});
        })
        .catch(() => {
          resolve({});
        });
    });
  }
}
