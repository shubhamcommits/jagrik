import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility-service/utility.service';
import { StorageService } from 'src/shared/services/storage-service/storage.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../shared/services/user.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private utilityService: UtilityService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  selectedFile: ImageSnippet;
  profileForm: FormGroup;
  userData: any = [];
  UserDataPicture: any = '';
  newPost = '';

  ngOnInit(): void {
    this.userData = this.storageService.getLocalData('userData');

    this.profileForm = this.formBuilder.group({
      first_name: new FormControl(this.userData.first_name, [
        Validators.required,
        Validators.nullValidator,
      ]),
      last_name: new FormControl(this.userData.last_name, [
        Validators.required,
        Validators.nullValidator,
      ]),
      email: new FormControl(this.userData.email, [
        Validators.email,
        Validators.required,
        Validators.nullValidator,
      ]),
    });

    this.profileForm.addControl(
      'mobile_number',
      new FormControl(this.userData.mobile_number, [
        Validators.required,
        Validators.nullValidator,
        Validators.pattern('^[0-9]{10}$'),
      ])
    );

    this.profileForm.addControl('bio', new FormControl(this.userData.bio));
    this.profileForm.addControl(
      'hobbies',
      new FormControl(this.userData.hobbies)
    );

    if (this.userData.role == 'student') {
      this.profileForm.addControl(
        'date_of_birth',
        new FormControl(this.convertISOToDate(), [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'emergency_contact_number',
        new FormControl(this.userData.emergency_contact_number, [
          Validators.required,
          Validators.nullValidator,
          Validators.pattern('^[0-9]{10}$'),
        ])
      );

      this.profileForm.addControl(
        'emergency_contact_name',
        new FormControl(this.userData.emergency_contact_name, [
          Validators.required,
          Validators.nullValidator,
        ])
      );

      this.profileForm.addControl(
        'block',
        new FormControl(this.userData.block, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'district',
        new FormControl(this.userData.district, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'state',
        new FormControl(this.userData.state, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'religion',
        new FormControl(this.userData.religion, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'social_media_username',
        new FormControl(this.userData.social_media_username, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'in_school',
        new FormControl(this.userData.in_school, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
      this.profileForm.addControl(
        'caste_category',
        new FormControl(this.userData.caste_category, [
          Validators.required,
          Validators.nullValidator,
        ])
      );
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  updateProfile() {
    this.validateAllFormFields(this.profileForm);
    if (this.profileForm.valid) {
      return new Promise((resolve) => {
        // Call the service function
        this.userService
          .updateProfile(this.profileForm.value)
          .then((res) => {
            resolve(res);

            this.getProfile();

            // Fire sucess toast
            this.utilityService.fireToast(
              'success',
              `Profile updated successfully`
            );
          })
          .catch(() => {
            // Fire error toast
            this.utilityService.fireToast(
              'error',
              `Some unexpected error occured, please try again!`
            );
          });
      });
    } else {
      this.validateAllFormFields(this.profileForm);
    }
  }

  getProfile() {
    return new Promise((resolve) => {
      // Call the service function
      this.userService
        .get()
        .then((res) => {
          // Store the user data locally
          this.storageService.setLocalData(
            'userData',
            JSON.stringify(res['user'])
          );

          this.userData = this.storageService.getLocalData('userData');
          resolve(res);
        })
        .catch(() => {
          // Fire error toast
          this.utilityService.fireToast(
            'error',
            `Some unexpected error occured, please try again!`
          );
        });
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      return new Promise((resolve) => {
        // Call the service function
        this.userService
          .uploadImage(file)
          .then((res) => {
            // Fire sucess toast
            this.getProfile();
            this.utilityService.fireToast(
              'success',
              `Profile Picture Updated successfully`
            );
          })
          .catch(() => {
            // Fire error toast
            this.utilityService.fireToast(
              'error',
              `Some unexpected error occured, please try again!`
            );
          });
      });
    });

    reader.readAsDataURL(file);
  }

  getProfilePicture(image) {
    var type = 'image/jpeg';

    var file = new Blob([image], {
      type: type,
    });
    var reader = new FileReader();
    var self = this;
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      var base64data = reader.result;
      self.UserDataPicture = base64data;
    };
  }

  convertISOToDate() {
    var date = new Date(this.userData.date_of_birth);
    return date.toJSON().slice(0, 10);
  }
}
