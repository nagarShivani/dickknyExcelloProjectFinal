import { Component } from "@angular/core";
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
import { FirebaseServiceService } from "src/app/services/fileupload/firebase-service.service";
import { AngularFireStorage } from "@angular/fire/compat/storage";

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
  selector: "app-product-add-edit",
  templateUrl: "./product-add-edit.component.html",
  styleUrls: ["./product-add-edit.component.scss"],
})
export class ProductAddEditComponent {
  loading: boolean = false;
  loading1: boolean = false;
  paramsid: any;
  showerror: boolean = false;
  showerrorprice: boolean = false;
  showerrortag: boolean = false;
  showsaleprice: boolean = false;
  showerrorcategory: boolean = false;
  showerrorbrand: boolean = false;
  showerrorsize: boolean = false;
  showerrorcolor: boolean = false;
  loginid: any;
  description: any;
  category: any[] = [];
  tag: any;
  title: any;
  startdate: any;
  enddate: any;
  CategoryList: any;
  BrandList: any;
  SizeList: any;
  ColorList: any;
  price: any;
  salePrice: any;
  color: any[] = [];
  size: any[] = [];
  image: any;
  multipleimage: any;
  brand: any;
  downloadURL: any;
  saveimageurl: any;
  productInformation: any;
  additionalInformation: any;
  // categoryId:any[]=[];

  constructor(
    private ErpService: ErpService,
    private activaedroute: ActivatedRoute,
    public router: Router,
    private FirebaseServiceService: FirebaseServiceService
  ) {
    let login: any = localStorage.getItem("loginid");
    this.loginid = JSON.parse(login);

    this.ErpService.getAllCategory().subscribe((res: any) => {
      this.CategoryList = res.data;
    });
    this.ErpService.getAllBrand().subscribe((res: any) => {
      this.BrandList = res.data;
    });
    this.ErpService.getAllcolor().subscribe((res: any) => {
      this.ColorList = res.data;
    });
    this.ErpService.getAllsize().subscribe((res: any) => {
      this.SizeList = res.data;
    });

    this.activaedroute.params.subscribe((params: any) => {
      this.paramsid = params?.id;
      if (this.paramsid) {
        this.loading = true;
        this.ErpService.getAllProductsById(this.paramsid).subscribe(
          (res: any) => {
            this.title = res?.name;
            this.tag = res?.tag;
            this.price = res?.price;
            this.salePrice = res?.salePrice;
            this.color = res?.color;
            let catid: any = [];
            res?.categoryId.map((item: any) => {
              catid.push(item?._id);
            });
            this.category = catid;

            let colorid: any = [];
            res?.color.map((item: any) => {
              colorid.push(item?._id);
            });
            this.color = colorid;

            let sizeid: any = [];
            res?.size.map((item: any) => {
              sizeid.push(item?._id);
            });
            this.size = sizeid;

            this.brand = res?.brandId?._id;
            this.saveimageurl = res?.image;
            this.multipleimage = res?.multipleimage;
            this.productInformation = res?.productInformation;
            this.additionalInformation = res?.additionalInformation;
            this.loading = false;
            console.log(this.multipleimage, "sdddddddddd");
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
      // return;
    }
    if (!this.price) {
      this.showerrorprice = true;
      // return;
    }
    if (!this.tag) {
      this.showerrortag = true;
      // return;
    }
    if (!this.salePrice) {
      this.showsaleprice = true;
      // return;
    }
    if (!this.category || this.category.length === 0) {
      this.showerrorcategory = true;
    }
    if (!this.brand || this.brand.length === 0) {
      this.showerrorbrand = true;
    }
    if (!this.size || this.size.length === 0) {
      this.showerrorsize = true;
    }
    if (!this.color || this.color.length === 0) {
      this.showerrorcolor = true;
    }
    if (
      this.showerror ||
      this.showerrorprice ||
      this.showerrortag ||
      this.showsaleprice ||
      this.showerrorcategory ||
      this.showerrorbrand ||
      this.showerrorsize ||
      this.showerrorcolor
    ) {
      return;
    }
    let payload: any = {
      name: this.title || "",
      price: this.price,
      tag: this.tag,
      salePrice: this.salePrice,
      image: this.saveimageurl,
      multipleimage: this.multipleimage,
      additionalInformation: this.additionalInformation,
      productInformation: this.productInformation,
      description: this.description,
      size: this.size,
      color: this.color,
      categoryId: this.category,
      brandId: this.brand,
    };

    if (this.paramsid) {
      this.ErpService.updateProduct(this.paramsid, payload).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("product Updated Successfully");
          this.router.navigate(["/main/product"]);
        }
      );
    } else {
      this.ErpService.addProduct({ body: payload }).subscribe((res: any) => {
        console.log("product added response:", res);
        this.ErpService.toast.snackbarError("Product Added Successfully");

        this.router.navigate(["/main/product"]);
      });
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loading = true;
      this.FirebaseServiceService.uploadFile("product/" + file.name, file)
        .then((url) => {
          console.log("File uploaded successfully. URL:", url);
          this.saveimageurl = url;
          this.ErpService.toast.snackbarSuccess("File uploaded successfully");
          this.loading = false;
        })
        .catch((error) => {
          console.error("File upload failed:", error);
          this.ErpService.toast.snackbarError("File upload failed");
          this.loading = false;
        });
    }
  }
  uploadFileMultiple(event: any) {
    const files = event.target.files;
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const uploadPromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        this.loading1 = true;
        const uploadPromise = this.FirebaseServiceService.uploadFileMultiple(
          "product/" + file.name,
          file
        );
        uploadPromises.push(uploadPromise);
      }
    }

    Promise.all(uploadPromises)
      .then((urls) => {
        console.log("All files uploaded successfully. URLs:", urls);
        this.multipleimage = urls;
        this.ErpService.toast.snackbarSuccess(
          "All Files uploaded successfully"
        );
        this.loading1 = false;
        console.log(this.multipleimage, "dmsdskjdskj");
      })
      .catch((error) => {
        this.ErpService.toast.snackbarSuccess("Something went wrong");
        this.loading1 = false;
        console.error("File upload failed:", error);
      });
  }
}
