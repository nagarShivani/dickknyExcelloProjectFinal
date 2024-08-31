import { ErpService } from "./../../../../../services/erp.service";
import { Component, ViewChild } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "../../../employee/components/confirm-dialog/confirm-dialog.component";
import * as moment from "moment";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent {
  data: any;
  loading?: boolean = true;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ["title", "Status", "Action"];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  moment: any = moment;
  searchfilter: any;
  listDate: any;
  startdate: any;
  enddate: any;
  userInfoObj: any;

  constructor(
    private ErpService: ErpService,
    public router: Router,
    public dialog: MatDialog
  ) {
    let userInfo: any = localStorage.getItem("userInfo");
    this.userInfoObj = userInfo ? JSON.parse(userInfo) : "";

    this.GetAllevent();
  }

  GetAllevent() {
    this.loading = true;
    this.ErpService.getAllCategory().subscribe((res: any) => {
      this.listDate = res?.data;
      console.log("response check" + this.listDate);
      this.dataSource.data = res?.data;

      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  Add() {
    if (!this.loading) {
      this.router.navigate(["/main/category/categoryadd"]);
    }
  }

  editRow(item: any) {
    if (!this.loading) {
      this.router.navigate(["/main/category/categoryEdit/" + item?._id]);
    }
  }

  deleteRow(item: any) {
    if (!this.loading) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "250px",
        data: {
          title: "Confirm Delete",
          message: "Are you sure you want to delete?",
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.calldeleteItemApi(item);
          console.log(this.calldeleteItemApi(item));
        }
      });
    }
  }
  calldeleteItemApi(item: any) {
    this.ErpService.deleteCategory(item._id).subscribe((res: any) => {
      this.ErpService.toast.snackbarError("Category Deleted Successfully");

      this.GetAllevent();
    });
  }

  Search() {
    let filteredData = this.listDate;
    console.log("category Filter Data" + filteredData);

    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.name
          ?.toLowerCase()
          .trim()
          .includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}
