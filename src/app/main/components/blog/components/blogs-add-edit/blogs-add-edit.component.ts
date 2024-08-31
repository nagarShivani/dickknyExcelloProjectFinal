// import { Component } from "@angular/core";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ErpService } from "src/app/services/erp.service";
import { Editor } from "ngx-editor";
// import * as CustomEditor from '../assets/ckeditor/build/ckeditor';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AngularEditorConfig } from "@kolkov/angular-editor";

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
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
  selector: "app-blogs-add-edit",
  templateUrl: "./blogs-add-edit.component.html",
  styleUrls: ["./blogs-add-edit.component.scss"],
})
export class BlogsAddEditComponent {
  // public editor: Editor | any;
  public Editor = ClassicEditor;
  // public config = {
  //   plugins: [Image, ImageToolbar, ImageCaption, ImageStyle, ImageUpload],
  //   toolbar: [
  //     "heading",
  //     "|",
  //     "bold",
  //     "italic",
  //     "link",
  //     "bulletedList",
  //     "numberedList",
  //     "blockQuote",
  //     "|",
  //     "insertTable",
  //     "tableColumn",
  //     "tableRow",
  //     "mergeTableCells",
  //     "|",
  //     "undo",
  //     "redo",
  //     "|",
  //     "uploadImage",
  //     "imageStyle:full",
  //     "imageStyle:side",
  //     "|",
  //     "imageTextAlternative",
  //   ],
  //   image: {
  //     toolbar: [
  //       "imageStyle:full",
  //       "imageStyle:side",
  //       "|",
  //       "imageTextAlternative",
  //     ],
  //   },
  // };

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
  };

  paramsid: any;
  showerror: boolean = false;
  showauthorerror: boolean = false;
  showdescriptionerror: boolean = false;
  loading: boolean = false;
  loginid: any;
  description: string = "";
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
  authorname: any;
  element: any;

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
        this.ErpService.getAllBlogById(this.paramsid).subscribe(
          (res: any) => {
            this.title = res?.title;
            (this.authorname = res?.authorname),
              (this.description = res?.description);
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

  SubmitEvent() {
    if (!this.title) {
      this.showerror = true;
      // return;
    }
    if (!this.authorname) {
      this.showauthorerror = true;
      // return;
    }
    if (!this.description) {
      this.showdescriptionerror = true;
      // return;
    }
    if (this.showerror || this.showauthorerror || this.showdescriptionerror) {
      return;
    }
    let payload: any = {
      title: this.title || "",
      authorname: this.authorname,
      image: this.saveimageurl,
      description: this.description,
    };

    if (this.paramsid) {
      this.ErpService.updateBlog(this.paramsid, payload).subscribe(
        (res: any) => {
          this.ErpService.toast.snackbarError("blog Updated Successfully");

          this.router.navigate(["/main/blog"]);
        }
      );
    } else {
      this.ErpService.addBlog({ body: payload }).subscribe((res: any) => {
        this.ErpService.toast.snackbarError("Blog Added Successfully");

        this.router.navigate(["/main/blog"]);
      });
    }
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
}
