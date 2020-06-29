import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { ClassService } from '../../shared/services/class.service';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.scss']
})
export class JoinClassComponent implements OnInit {

  constructor(
    private _Injector: Injector,
  ) { }

  // Join Class Form
  joinClassForm: FormGroup

  // Class event emitter
  @Output('class') class_name = new EventEmitter()

  ngOnInit(): void {

    // Initialise the formgroup
    this.joinClassForm = new FormGroup({
      class_code: new FormControl(null, [Validators.required, Validators.nullValidator]),
    })
  }

  onSubmit() {
    this.joinClassByCode(this.joinClassForm.controls['class_code'].value)
  }

  joinClassByCode(class_code: any) {
    return new Promise((resolve) => {

      // Utility Service Instance
      let utilityService = this._Injector.get(UtilityService)

      // Class Service Instance
      let classService = this._Injector.get(ClassService)

      classService.joinToClass(undefined, class_code)
        .then((res) => {

          // Emit the classId to the parent components
          this.class_name.emit(res['class'])

          // Fire error toast
          utilityService.fireToast('success', `Welcome to your new class!`)

          // Resolve with sucess
          resolve(res)
        })
        .catch(() => {

          // Fire error toast
          utilityService.fireToast('warning', `Class code is not valid!`)

          // Resolve the promise
          resolve()
        })
    })
  }

}
