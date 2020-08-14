import { Component, OnInit, Injector } from '@angular/core';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
@Component({
  selector: 'app-class-agenda',
  templateUrl: './class-agenda.component.html',
  styleUrls: ['./class-agenda.component.scss'],
})
export class ClassAgendaComponent implements OnInit {
  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const storageService = this.injector.get(StorageService);
    if (storageService.existData('new') && storageService.getLocalData('new') == 'yes') {
      storageService.setLocalData('new', 'no');
      window.location.reload()
    }
  }
}
