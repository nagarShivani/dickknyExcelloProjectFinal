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
  selector: "app-size",
  templateUrl: "./size.component.html",
  styleUrls: ["./size.component.scss"],
})
export class SizeComponent {
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
    this.ErpService.getAllsize().subscribe((res: any) => {
      this.loading = true;
      this.listDate = res?.data;

      this.dataSource.data = res?.data;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  Add() {
    this.router.navigate(["/main/size/sizeadd"]);
  }

  editRow(item: any) {
    this.router.navigate(["/main/size/sizeEdit/" + item?._id]);
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
    this.ErpService.deletesize(item._id).subscribe((res: any) => {
      this.ErpService.toast.snackbarError("size Deleted Successfully");

      this.GetAllevent();
    });
  }

  Search() {
    let filteredData = this.listDate;

    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.size
          ?.toLowerCase()
          .trim()
          .includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}
