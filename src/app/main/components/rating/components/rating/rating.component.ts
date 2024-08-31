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
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"],
})
export class RatingComponent {
  loading?: boolean = true;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    "productname",
    "firstName",
    "rating",
    "comments",
    "Action",
  ];
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

    this.getAllRating();
  }
  getAllRating() {
    this.ErpService.getAllRating().subscribe((res: any) => {
      this.loading = true;
      this.listDate = res?.data;

      this.dataSource.data = res?.data;
      this.dataSource.paginator = this.paginator;

      this.loading = false;
    });
  }

  Add() {
    this.router.navigate(["/main/coupon/couponadd"]);
  }

  editRow(item: any) {
    this.router.navigate(["/main/coupon/couponEdit/" + item?._id]);
  }

  deleteRow(item: any) {
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
      }
    });
  }
  calldeleteItemApi(item: any) {
    this.ErpService.deleteRating(item._id).subscribe((res: any) => {
      this.ErpService.toast.snackbarError("Rating Deleted Successfully");

      this.getAllRating();
    });
  }

  Search() {
    let filteredData = this.listDate;

    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.code
          ?.toLowerCase()
          .trim()
          .includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}
