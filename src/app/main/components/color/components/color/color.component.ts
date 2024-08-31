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
  selector: "app-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"],
})
export class ColorComponent {
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
    this.ErpService.getAllcolor().subscribe((res: any) => {
      this.loading = true;
      this.listDate = res?.data;
      console.log("color fetching" + this.listDate);

      this.dataSource.data = res?.data;
      this.dataSource.paginator = this.paginator;

      this.loading = false;
    });
  }

  Add() {
    this.router.navigate(["/main/color/coloradd"]);
  }

  editRow(item: any) {
    this.router.navigate(["/main/color/colorEdit/" + item?._id]);
  }

  deleteRow(item: any) {
    if (!this.loading) {
      console.log("deleteRow called with item in color section:", item);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "250px",
        data: {
          title: "Confirm Delete",
          message: "Are you sure you want to delete?",
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log("Dialog result  color section:", result);
        if (result) {
          this.calldeleteItemApi(item);
          console.log("color delete" + this.calldeleteItemApi(item));
        }
      });
    }
  }

  calldeleteItemApi(item: any) {
    console.log("API called with item:", item);
    this.ErpService.deleteColor(item._id).subscribe((res: any) => {
      this.ErpService.toast.snackbarError("Color Deleted Successfully");

      this.GetAllevent();
    });
  }

  Search() {
    let filteredData = this.listDate;
    console.log("colorFilter" + filteredData);
    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.color
          ?.toLowerCase()
          .trim()
          .includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}
