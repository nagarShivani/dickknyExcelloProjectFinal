import { ErpService } from 'src/app/services/erp.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {
  constructor(private ErpService:ErpService,
    private router : Router){

  }
  email:any;
  showmsg:boolean=false


  onSubmit(){
    if(!this.email){
      return
    }
    let payload={
      "email":this.email
    }
    this.ErpService.forgetpassword({body:payload}).subscribe((res)=>{
      // this.router.navigate(['reset-password'])
      this.ErpService.toast.snackbarSuccess('Check your email and click on the link')


    })


  }
}
