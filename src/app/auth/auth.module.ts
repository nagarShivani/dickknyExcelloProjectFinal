import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetComponent,
    ResetpasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,

  ],

  providers:[]
})
export class AuthModule { }
