import { ActivatedRoute, Router } from '@angular/router';
import { ErpService } from './../../../../../services/erp.service';
import { FileUpload } from 'src/app/shared/classes/file-upload';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadService } from 'src/app/services/fileupload/file-upload.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { Component,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent {
  dataSource = new MatTableDataSource<any>([]);

moment:any=moment
  addForm:any;
  userId:any;
  selectedFiles: any;
  paramsid: any;
  username: any;
  email: any;
  number: any;
  role: any;
  category: any;
  qualification: any;
  street: any;
  city: any;
  state: any;
  employeeDetailSideBarArr :any=[
    {name:'Personal Detail'},
    {name:'Change Password'},
    {name:'Work From Home'},
    // {name:'Activity Log'},
    // {name:'Attendance'},
    // {name:'Leave'},
    // {name:'Assets'},
    // {name:'Job History'},
  ]
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  pageSize:number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'title',
    'startdate',
    'enddate',
    'status',
  ];

  country: any;
  zipCode: any;
  joiningDate: any;
  currentUpload:any= FileUpload;
  imageUrl: any;
  showimage: any;
officeId: any;
  userMenuList: any;
  getemployeedata: any;
currentpassword: any;
password: any;
confirmpassword: any;
showerror: boolean =false;
  grosssalary: any;
  gender: any;
  listDate: any;


    constructor(
      public ErpService:ErpService,
      private router:Router,
      private activaedroute:ActivatedRoute,
      private FileUploadService:FileUploadService,
      private location :Location

      ) {
        this.checkName('Personal Detail')


        this.activaedroute.params.subscribe((params:any)=>{
          this.paramsid = params?.id
         if(this.paramsid){
          this.getwfhListOfEmployee()
          this.ErpService.EditEmployee(this.paramsid).subscribe((res:any)=>{
            this.getemployeedata = res
            this.username= res?.user?.username
            this.email=res?.user?.email
            this.number=res?.user?.number
            this.role=res?.user?.role
            this.gender=res?.user?.Gender
            this.category=res?.category
            this.officeId=res?.user?.officialId,
            this.qualification=res?.qualification
            this.street=res?.address?.street
            this.city=res?.address?.city
            this.state=res?.address?.state
            this.country = res?.address?.country
            this.zipCode=res?.address?.zipCode
            this.joiningDate= new Date(res?.user?.joiningDate)
            this.showimage=res?.images?.user?.[0]?.url
            this.grosssalary=res?.salary?.GrossSalary
          })
         }

        });

      }


    ngOnInit(): void {
    }
    getwfhListOfEmployee(){
      this.ErpService.GetAllWorkFromListForEmployee(this.paramsid).subscribe((res:any)=>{
      this.listDate = res?.data

        this.dataSource.data = res?.data
        this.dataSource.paginator = this.paginator;
      })

    }
    onFileInput(event: any) {
      if (event.target.files) {
        this.selectedFiles = event.target.files;
        let file = this.selectedFiles.item(0);
        this.currentUpload = new FileUpload(file);
       if(this.currentUpload.file.type.includes('image')){
        this.uploadImage()
       }
      }
    }
    uploadImage() {
      if (this.selectedFiles) {
        const file = this.selectedFiles[0];
        const subfolderPath = 'profile';
        // this.FileUploadService.pushUpload(this.currentUpload.file, 'profile')
        //   .then((res: any) => {
        //     this.imageUrl = res.url; // Assuming the URL is returned under 'url' property
        //     this.UpdateProfile()
        //   })
        //   .catch((error: any) => {
        //   });
      }
    }

    UpdateProfile(){
      let payload: any = {
        username: this.username,
        email: this.email,
        number: this.number,
        category: this.category,
        images: [{url:this.imageUrl|| ''}],
        qualification: this.qualification,
      };

      if(this.paramsid){
        this.ErpService.UpdateEmployee(this.paramsid,payload).subscribe((res:any)=>{
        this.ErpService.toast.snackbarError("Profile Updated Successfully");

          this.router.navigate(['/main/profile/'+this.paramsid])
        })

      }

  }

  checkName(item:any){
    this.userMenuList = item

  }


    onDateChange(event: any) {
      if (event.value) {
        this.joiningDate = this.formatDateToISOString(event.value);
      }
    }

    formatDateToISOString(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    back(){
      this.location.back()
    }

    Sumbit(){
      if(!this.password ||  !this.confirmpassword || !this.currentpassword ){
        this.showerror = true
        return

      }
      if(this.password != this.confirmpassword){
        return
      }
      let payload={
        employeeId: this.paramsid, oldPassword:this.currentpassword, newPassword:this.password

      }

this.ErpService.ChangePassword({body: payload}).subscribe((res: any) => {
  if(res){
    localStorage.clear();
    this.router.navigate(['/'])
    this.ErpService.toast.snackbarError('Password Changed Successfully');

  }
}, (error) => {
  if (error.status === 401 ) {
      this.ErpService.toast.snackbarError(error?.error?.message);
  }
});


    }

    goToSalarySlipPage(): void {
      this.router.navigate(['/main/employee/salarySlip/'+this.paramsid]);

      // const element = document.getElementById('fixedpage') as HTMLElement;

      // html2canvas(element).then(canvas => {
      //   const imgData = canvas.toDataURL('image/png');
      //   const pdf = new jsPDF();
      //   const imgProps = pdf.getImageProperties(imgData);
      //   const pdfWidth = pdf.internal.pageSize.getWidth();
      //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      //   pdf.save('salaryslip.pdf');
      // });
    }
}
