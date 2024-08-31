import { ErpService } from 'src/app/services/erp.service';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email:any;
  password:any;
  mobile:any;
  showmsg:boolean=false
  correctemailmsg: boolean=false;
  validateNumber: boolean=false;
  username: any;
  constructor(private AuthService:AuthService,
    private ErpService:ErpService,
    private router :Router){

  }
  checkEmail(event:any) {
    let inputValue = event.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputValue.match(emailRegex)) {
      this.correctemailmsg = false;
    } else {
      this.correctemailmsg = true;
    }
  }
  validateNumbercheck(event:any){
    let inputValue:any = event.target.value;
    const numberRegex = /^[0-9]+$/;
    if (inputValue.length > 10) {
      this.mobile = inputValue.slice(0, 10);
    }
    if ( this.mobile.length === 10 && this.mobile.match(numberRegex)) {
      this.validateNumber =false
      // You can add further logic for valid number
    } else {
      this.validateNumber =true

      // You can add further logic for invalid number
    }
  }


  Submit(){
    if(!this.email || !this.password || !this.mobile || !this.username){
      this.showmsg = true
      return
    }
    if(this.validateNumber || this.correctemailmsg){
      return
    }
    let payload={
      "email":this.email,
      "password":this.password,
      "number":this.mobile,
      "username":this.username,
    }
    this.ErpService.signUpUser({ body: payload }).subscribe(
      (res: any) => {
        if (!res.error) {
          this.router.navigate(['main/dashboard']);
          // localStorage.setItem('isLoggedIn', JSON.stringify(res?.userId));
          localStorage.setItem('isLoggedIn', JSON.stringify(res?.token));

          localStorage.setItem('loginid', JSON.stringify(res?.loginid));
          localStorage.setItem('username', JSON.stringify(res?.username));

          this.AuthService.toast.snackbarError("Registered Successfully!");
        } else {
          this.AuthService.toast.snackbarError("Something went wrong!");
        }
      },
      (error: any) => {
        if (error.status === 400) {
          // Handle 400 Bad Request error
          this.AuthService.toast.snackbarError("Email already Exists");
        } else {
          // Handle other errors
          this.AuthService.toast.snackbarError("An error occurred while processing your request.");
        }
      }
    );


  }
}
