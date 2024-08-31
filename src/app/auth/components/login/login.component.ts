import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ErpService } from 'src/app/services/erp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: any;
  password: any;
  showmsg: boolean=false;
  showPassword: boolean=false;
  loadingNext: boolean = false;
  constructor(private router :Router,
    public AuthService:AuthService,
    public ErpService:ErpService,

    private cookieService: CookieService

    ){

  }



  onSubmit(){

    if(!this.email || !this.password ){
      this.showmsg = true
      return
    }
    this.loadingNext = true;


    let payload={
      "email":this.email,
      "password":this.password,
    }
    setTimeout(() => {
      this.loadingNext = false;
    }, 12000);
    this.ErpService.logInUser({ body: payload }).subscribe(
      (res: any) => {
        if (res) {
          this.router.navigate(['/main/dashboard']);
          localStorage.setItem('isLoggedIn', JSON.stringify(res?.token));
          localStorage.setItem('loginid', JSON.stringify(res?.loginid));
          localStorage.setItem('username', JSON.stringify(res?.username));
          localStorage.setItem('userInfo', JSON.stringify(res?.user));

          // this.cookieService.set('userInfo', JSON.stringify(res?.user));

          this.AuthService.toast.snackbarError("Login Successfully!");
          this.loadingNext = false;


        } else {

          // Handle other scenarios if needed
        }
      },
      (error: any) => {
        console.log(error,'erererere')
        if (error.status === 401) {
          this.loadingNext = false;
          this.AuthService.toast.snackbarError("Invalid email or password");
        } else {
          // Handle other errors if needed
        }
      }
    );


  }
}


