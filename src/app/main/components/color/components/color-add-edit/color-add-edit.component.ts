import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ErpService } from "src/app/services/erp.service";

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
  selector: "app-color-add-edit",
  templateUrl: "./color-add-edit.component.html",
  styleUrls: ["./color-add-edit.component.scss"],
})
export class ColorAddEditComponent {
  loading: boolean = false;
  paramsid: any;
  showerror: boolean = false;
  loginid: any;
  description: any;
  category: any;
  title: any;
  startdate: any;
  enddate: any;

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
        this.ErpService.getAllcolorById(this.paramsid).subscribe(
          (res: any) => {
            this.title = res?.color;
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
    if (!this.title) {
      this.showerror = true;
      return;
    }

    let payload: any = {
      color: this.title || "",
    };

    if (this.paramsid) {
      this.ErpService.updatecolor(this.paramsid, payload).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("color Updated Successfully");

          this.router.navigate(["/main/color"]);
        }
      );
    } else {
      this.ErpService.addcolor({ body: payload }).subscribe((res: any) => {
        this.ErpService.toast.snackbarError("color Added Successfully");

        this.router.navigate(["/main/color"]);
      });
    }
  }
}
