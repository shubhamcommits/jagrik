import { Component, OnInit, Injector } from '@angular/core';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: './dashboard-classes.component.html',
  styleUrls: ['./dashboard-classes.component.scss'],
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class DashboardClassesComponent implements OnInit {
  constructor(private injector: Injector, public router: Router) {}

  // Array list of classes
  classes: any = [];

  userData: any;

  ngOnInit(): void {
    const storageService = this.injector.get(StorageService);
    if (storageService.existData('userData')) {
      this.userData = storageService.getLocalData('userData');
      this.classes = storageService.getLocalData('userData').classes;
      if (this.classes.length > 0) {

        this.router.navigate([
          '/dashboard', 'classes', 'agenda'],
          { queryParams: { classId: this.classes[0] } },
        );
        window.location.href =
          '#/dashboard/classes/agenda?classId=' + this.classes[0];
      }
    }
    console.log(this.userData);
  }

  getClass(class_name: string) {
    this.classes.unshift(class_name);

    const storageService = this.injector.get(StorageService);

    let userData = storageService.getLocalData('userData');

    userData.classes = this.classes;

    storageService.setLocalData('userData', JSON.stringify(userData));
    storageService.setLocalData('new', JSON.stringify('yes'));
    this.router.navigate(['/dashboard', 'classes', 'agenda'], {
      queryParams: { classId: userData.classes[0] },
    });

    // window.location.href =
    //   '#/dashboard/classes/agenda?classId=' + userData.classes[0];
  }
}
