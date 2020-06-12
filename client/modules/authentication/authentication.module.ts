import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';

// External Modules
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from 'src/shared/module/shared/shared.module';

// Components
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [SignupComponent, SigninComponent, HomeComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,

    // ReactiveForms Module 
    ReactiveFormsModule,

    // Shared Module
    SharedModule
  ]
})
export class AuthenticationModule { }
