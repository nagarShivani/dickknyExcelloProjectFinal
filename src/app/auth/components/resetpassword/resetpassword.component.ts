import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ErpService } from 'src/app/services/erp.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  empid: any;
  token: any;
  password: any;
cpassword: any;
  constructor(private erp:ErpService,
    private ActivatedRoute:ActivatedRoute,
    private router:Router
    ){
      this.ActivatedRoute.params.subscribe((params:any)=>{
        this.empid = params.id,
        this.token = params.token

      })


  }
  Submit(){
    if(!this.password || this.password != this.cpassword){
      return
    }
    let payload={
      password:this.password
        }
    this.erp.resetpassword({body:payload},this.empid,this.token).subscribe((res)=>{
      if(res.Status == 'Success'){
        this.router.navigate(['/login'])
        this.erp.toast.snackbarSuccess('Password Chnages Successfully')
      }else{
        this.erp.toast.snackbarError('Something went wrong')

      }
    })





  }

}
