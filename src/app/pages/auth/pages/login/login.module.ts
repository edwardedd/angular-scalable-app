import { PasswordModule } from './../../../../shared/controls/password/password.module';
import { InputModule, ButtonModule, SpinnerModule, FormFieldModule } from '@app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    InputModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    SpinnerModule,
    FormFieldModule

  ]
})
export class LoginModule { }
