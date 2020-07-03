import { Component, OnInit, Injector } from '@angular/core';
import { StorageService } from 'src/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: './dashboard-classes.component.html',
  styleUrls: ['./dashboard-classes.component.scss'],
  styles: [`
    :host {
        display: inline-block;
        width:100%;
        height:100%;
    }
    `]
})
export class DashboardClassesComponent implements OnInit {

  constructor(private injector: Injector) { }

  // Array list of classes
  classes: any = []

  userData: any

  ngOnInit(): void {
    const storageService = this.injector.get(StorageService);
    if(storageService.existData('userData')){
      this.userData = storageService.getLocalData('userData')
      this.classes = storageService.getLocalData('userData').classes
    }
    console.log(this.userData)
  }

  getClass(class_name: string){
    this.classes.unshift(class_name)

    const storageService = this.injector.get(StorageService)

    let userData = storageService.getLocalData('userData')

    userData.classes = this.classes

    storageService.setLocalData('userData', JSON.stringify(userData))

  }

}
