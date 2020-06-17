import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { ClassService } from '../../shared/services/class.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {

  constructor(
    public utilityService: UtilityService,
    private classService: ClassService
  ) { }

  // Class event emitter
  @Output('class') class_name = new EventEmitter()

  ngOnInit(): void {
  }

  /**
   * This function opens the Swal modal to create normal, agora and smart groups
   * @param title 
   * @param imageUrl 
   */
  openModal(title: string) {
    return this.utilityService.getSwalModal({
      title: title,
      input: 'text',
      inputPlaceholder: 'Try to add a short name',
      inputAttributes: {
        maxlength: 20,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      imageAlt: title,
      confirmButtonText: title,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
    })
  }

  /**
   * This function creates the new normal group
   */
  async openCreateClassModal() {
    const { value: value } = await this.openModal('Create Class');
    if (value) {
      this.classService.createClass(value)
      .then((res)=>{
        console.log(res)
        this.class_name.emit(res['class']['_id'])
      })
      .catch(()=> this.utilityService.fireToast('error', 'Unable to create class , please try again!', 2000) )
    } else if (value == '') {
      this.utilityService.fireToast('warning', 'Class name can\'t be empty!', 3000);
    }
  }

}
