import { Component, OnInit, Injector } from '@angular/core';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {
  public class: any;

  constructor(
    private _Injector: Injector,
    private _ActivatedRouter: ActivatedRoute,
    private _Router: Router,
    public utilityService?: UtilityService,
  ) {}

  substring = "inbox";
  isdash: boolean = false;
  // classId : any;
  // classId = this._ActivatedRoute.snapshot.queryParamMap.get('classId');
  storageService = this._Injector.get(StorageService);
  classId = this.storageService.getLocalData('userData').classes[0];
  userRole: any = []
  isOpen:Boolean = false
  async ngOnInit() {
    let currentUrl = this._Router.url;
    console.log(currentUrl);
    this.isdash = currentUrl.includes(this.substring);
    this.class = await this.getClassDetails(this.classId);
    // const storageService = this._Injector.get(StorageService);
    // this.classId = storageService.getLocalData('userData').classes[0];
    console.log(this.classId)
    if (this.storageService.existData('userData')) {
      this.userRole = this.storageService.getLocalData('userData').role;
    }
  }
  handlePopUp(title: string) {
    // if press yes then call close Class()
    // else close the popup
    return this.utilityService.getSwalModal({
      title: title,
      imageAlt: title,
      confirmButtonText: 'Freeze',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
    });
  }

  async openConfirmationModal() {
    const { value: value } = await this.handlePopUp('Confirm Class Freeze');
    if (value) {
      this.closeClass();
    } else if (value == ''){
      // close the modal
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
          window.location.reload()
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
