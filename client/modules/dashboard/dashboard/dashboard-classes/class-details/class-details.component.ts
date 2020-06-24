import { Component, OnInit, Injector } from '@angular/core';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId')

  public class: any

  async ngOnInit() {
    this.class = await this.getClassDetails(this.classId)
  }

  getClassDetails(classId: any) {
    return new Promise((resolve) => {

      // Create class service instance
      let classService = this._Injector.get(ClassService)

      // Fetch class details
      classService.getClassDetails(classId)
        .then((res) => {
          resolve(res['class'] || {})
        })
        .catch(() => {
          resolve({})
        })
    })
  }

}
