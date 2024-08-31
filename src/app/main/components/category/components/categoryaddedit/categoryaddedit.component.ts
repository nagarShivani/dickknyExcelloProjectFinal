import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ErpService } from "src/app/services/erp.service";
import { FirebaseServiceService } from "src/app/services/fileupload/firebase-service.service";

@Component({
  selector: "app-categoryaddedit",
  templateUrl: "./categoryaddedit.component.html",
  styleUrls: ["./categoryaddedit.component.scss"],
})
export class CategoryaddeditComponent {
  paramsid: any;
  showerror: boolean = false;
  loginid: any;
  description: any;
  saveimageurl: any;
  category: any;
  title: any;
  startdate: any;
  enddate: any;
  loading: boolean = false;

  constructor(
    private ErpService: ErpService,
    private activaedroute: ActivatedRoute,
    public router: Router,
    private FirebaseServiceService: FirebaseServiceService
  ) {
    let login: any = localStorage.getItem("loginid");
    this.loginid = JSON.parse(login);

    this.activaedroute.params.subscribe((params: any) => {
      this.paramsid = params?.id;
      if (this.paramsid) {
        this.loading = true;
        this.ErpService.getAllCategoryById(this.paramsid).subscribe(
          (res: any) => {
            this.title = res?.name;
            this.saveimageurl = res?.image;
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

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.FirebaseServiceService.uploadFile("product/" + file.name, file)
        .then((url) => {
          console.log("File uploaded successfully. URL:", url);
          this.saveimageurl = url;
          this.ErpService.toast.snackbarSuccess("File uploaded successfully");
        })
        .catch((error) => {
          console.error("File upload failed:", error);
        });
    }
  }

  SubmitEvent() {
    if (!this.title) {
      this.showerror = true;
      return;
    }

    let payload: any = {
      name: this.title || "",
      image: this.saveimageurl,
    };

    this.loading = true;
    if (this.paramsid) {
      this.ErpService.updateCategory(this.paramsid, payload).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("Category Updated Successfully");
          this.router.navigate(["/main/category"]);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    } else {
      this.ErpService.addCategory({ body: payload }).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("Category Added Successfully");
          this.router.navigate(["/main/category"]);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}
