import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ErpService } from "src/app/services/erp.service";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

export const MY_FORMATS = {
  parse: {
    dateInput: "LL",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};
@Component({
  selector: "app-coupon-add-edit",
  templateUrl: "./coupon-add-edit.component.html",
  styleUrls: ["./coupon-add-edit.component.scss"],
})
export class CouponAddEditComponent {
  paramsid: any;
  showerror: boolean = false;
  discountvalueError: boolean = false;
  discountvaluepercentageError: boolean = false;
  loading: boolean = false;
  loginid: any;
  description: any;
  category: any;
  title: any;
  startdate: any;
  enddate: any;
  // discountvalue: any;
  // discountvaluepercentage: any;
  discountvalue: number | null = null;
  discountvaluepercentage: number | null = null;

  @ViewChild("discountValueInput") discountValueInput!: ElementRef;
  @ViewChild("discountPercentageInput") discountPercentageInput!: ElementRef;

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
        this.ErpService.getCouponById(this.paramsid).subscribe(
          (res: any) => {
            this.title = res?.code;
            this.discountvalue = res?.discountValue;
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

  onDiscountValueChange() {
    if (this.discountvalue !== null) {
      this.discountPercentageInput.nativeElement.disabled = true;
    } else {
      this.discountPercentageInput.nativeElement.disabled = false;
    }
  }
  onDiscountPercentageChange() {
    if (this.discountvaluepercentage !== null) {
      this.discountValueInput.nativeElement.disabled = true;
    } else {
      this.discountValueInput.nativeElement.disabled = false;
    }
  }
  SubmitEvent() {
    if (!this.title) {
      this.showerror = true;
      // return;
    }
    // if (!this.discountvalue) {
    //   this.discountvalueError = true;

    // }
    // if (!this.discountvaluepercentage) {
    //   this.discountvaluepercentageError = true;

    // }
    if (this.showerror) {
      return;
    }

    let payload: any = {
      code: this.title || "",
      discountValue: this.discountvalue || "",
      expiryDate: "2030-04-30T19:10:57.581Z",
    };

    if (this.paramsid) {
      this.ErpService.updateCoupon(this.paramsid, payload).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("Coupon Updated Successfully");

          this.router.navigate(["/main/coupon"]);
        }
      );
    } else {
      this.ErpService.createCoupon({ body: payload }).subscribe((res: any) => {
        this.ErpService.toast.snackbarError("coupon Added Successfully");

        this.router.navigate(["/main/coupon"]);
      });
    }
  }
}
