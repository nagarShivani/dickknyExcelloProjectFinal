import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ErpService } from "src/app/services/erp.service";
// export const MY_FORMATS = {
//   parse: {
//     dateInput: "LL",
//   },
//   display: {
//     dateInput: "DD/MM/YYYY",
//     monthYearLabel: "YYYY",
//     dateA11yLabel: "LL",
//     monthYearA11yLabel: "YYYY",
//   },
// };
@Component({
  selector: "app-user-add-edit",
  templateUrl: "./user-add-edit.component.html",
  styleUrls: ["./user-add-edit.component.scss"],
})
export class UserAddEditComponent {
  paramsid: any;
  showerror: boolean = false;
  loading: boolean = false;
  loginid: any;
  description: any;
  category: any;
  firstName: string = "";
  startdate: any;
  enddate: any;
  lastName: string = "";
  email: string = "";
  phone: string = "";
  status: string = "";

  constructor(
    private ErpService: ErpService,
    private activaedroute: ActivatedRoute,
    public router: Router
  ) {
    let login: any = localStorage.getItem("loginid");
    this.loginid = JSON.parse(login);

    this.activaedroute.params.subscribe((params: any) => {
      this.paramsid = params?.id;
      if (this.paramsid) {
        this.loading = true;
        // getAllUsersById
        // getUserDetailById
        this.ErpService.getUserDetailById(this.paramsid).subscribe(
          (res: any) => {
            let resdata = res;
            console.log("user response", resdata);
            this.firstName = resdata?.user.firstName;
            console.log("check user firstName " + this.firstName);
            console.log(this.firstName);
            this.lastName = resdata?.user.lastName;
            this.email = resdata?.user.email;
            this.phone = resdata?.user.phone;
            console.log("check user phone " + this.phone);
            this.status = "Active";
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }
    });
  }

  onStartDateChange(event: any) {
    if (event.value) {
      this.startdate = this.formatDateToISOString(event.value);
    }
  }
  onEndDateChange(event: any) {
    if (event.value) {
      this.enddate = this.formatDateToISOString(event.value);
    }
  }

  formatDateToISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }
  SubmitEvent() {
    if (!this.firstName) {
      this.showerror = true;
      return;
    }

    let payload: any = {
      // firstName: this.firstname || "",
      // lastName: this.lastname || "",
      // email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };

    if (this.paramsid) {
      this.ErpService.updateUserDetails(this.paramsid, payload).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("User Updated Successfully");

          this.router.navigate(["/main/users"]);
        }
      );
    }
    // else {
    //   this.ErpService.createCoupon({ body: payload }).subscribe((res: any) => {
    //     this.ErpService.toast.snackbarError("coupon Added Successfully");

    //     this.router.navigate(["/main/coupon"]);
    //   });
    // }
  }
}
