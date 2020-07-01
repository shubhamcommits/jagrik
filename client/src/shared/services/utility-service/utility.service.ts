import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }


  /**
   * This function checks whether the input string is a vaild email or not
   * @param email 
   */
  validateEmail(email: String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * This function removes the duplicates from arrays of Objects based on the @name property name
   * @param array - pass the array from which you want to remove duplicates
   * @param property - pass the property on the basis of which you want to define distinction among arrays of objects
   */
  async removeDuplicates(array: Array<any>, property: string) {
    return array.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[property]).indexOf(obj[property]) === pos;
    });
  }

  /**
   * This functions is responsible for maintaining track the index while iterating through *ngFor 
   * @param index - index of the element
   * @param element - entire element which needs to be tracked
   */
  trackByIndex(index, element) {
    return element._id;
  }

  /**
   * This function starts the foreground loader of master loader
   * @param taskId
   */
  public startForegroundLoader(taskId?: string) {
    return this.ngxUiLoaderService.start(taskId);
  }

  /**
   * This function stops the foreground loader of master loader
   * @param taskId
   */
  public stopForegroundLoader(taskId?: string) {
    return this.ngxUiLoaderService.stop(taskId);
  }

  /**
   * This function starts the background loader of master loader
   * @param taskId - optional
   */
  public startBackgroundLoader(taskId?: string) {
    this.ngxUiLoaderService.startBackground(taskId);
  }

  /**
   * This function stops the background loader of master loader
   * @param taskId 
   */
  public stopBackgroundLoader(taskId?: string) {
    this.ngxUiLoaderService.stopBackground(taskId);
  }

  /**
   * This function stops all the foreground and background loader of master loader
   */
  public stopAllLoader() {
    this.ngxUiLoaderService.stopAll();
  }

  public getSwalModal(swalOptions: any){
    return Swal.fire(swalOptions);
  }

  public swalToast(timeout?: number) {
    return Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: timeout || 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  public fireToast(type: SweetAlertIcon, title: string, timeout?: number){
    return this.swalToast(timeout).fire({
      icon: type,
      title: title
    })
  }

}
