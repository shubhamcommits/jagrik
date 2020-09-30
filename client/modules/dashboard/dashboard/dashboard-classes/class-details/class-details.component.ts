import { Component, OnInit, Injector } from '@angular/core';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

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
  ) {}
  
  substring = "inbox";
  isdash: boolean = false;
  classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId');
  userRole: any = []
  isOpen:Boolean = false
  async ngOnInit() {
    let currentUrl = this._Router.url;
    console.log(currentUrl);
    this.isdash = currentUrl.includes(this.substring);
    this.class = await this.getClassDetails(this.classId);
    const storageService = this._Injector.get(StorageService);
    if (storageService.existData('userData')) {
      this.userRole = storageService.getLocalData('userData').role;
    }
  }

  closeClass() {
    return new Promise((resolve) => {
      // Create class service instance
      let classService = this._Injector.get(ClassService);

      // Fetch class details
      classService
        .closeClass(this.classId)
        .then((res) => {
          this.getClassDetails(this.classId)
          resolve(res);
        })
        .catch(() => {
          resolve({});
        });
    });
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
          this.isOpen = res['class']['is_open']
          resolve(res['class'] || {});
        })
        .catch(() => {
          resolve({});
        });
    });
  }
}
