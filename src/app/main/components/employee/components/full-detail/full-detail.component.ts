import { Component,Inject,OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import {ErpService} from '../../../../../services/erp.service'


@Component({
  selector: 'app-full-detail',
  templateUrl: './full-detail.component.html',
  styleUrls: ['./full-detail.component.scss']
})
export class FullDetailComponent {

  alldata: any
  employeeLeaveTaken:any
  employeePaidLeave:any

  responsedata:any


  constructor(
    public dialogRef: MatDialogRef<FullDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private erpService:ErpService
  ){
    this.erpService.EditEmployee(data?._id).subscribe((response)=>{
      this.responsedata=response
      console.log(this.responsedata,'uytrsdf')
      this.employeeLeaveTaken=response.EmpLeaveTaken.totalLeaveTaken
      this.employeePaidLeave=response.EmpLeaveTaken.paidLeaves
    })
  }

  ngOnInit(){
    this.route.queryParams.subscribe(param=>{
      this.alldata=param
    })
  }

  close(){
    this.dialogRef.close();
  }
}
