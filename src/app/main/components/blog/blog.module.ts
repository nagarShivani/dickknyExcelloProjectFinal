import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlogRoutingModule } from "./blog-routing.module";
import { BlogsComponent } from "./components/blogs/blogs.component";
import { BlogsAddEditComponent } from "./components/blogs-add-edit/blogs-add-edit.component";
import { FormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { MatCard, MatCardModule } from "@angular/material/card";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { EditorModule } from "@tinymce/tinymce-angular";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgxEditorModule } from "ngx-editor";
@NgModule({
  declarations: [BlogsComponent, BlogsAddEditComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,

    MatCardModule,
    CKEditorModule,
    EditorModule,
    AngularEditorModule,
    NgxEditorModule,
  ],
})
export class BlogModule {}
