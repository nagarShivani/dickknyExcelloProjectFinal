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
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.scss"],
})
export class BrandComponent {
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
    this.loading = true; // Show loading spinner and disable button
    this.ErpService.getAllBrand().subscribe((res: any) => {
      this.listDate = res?.data;
      this.dataSource.data = res?.data;
      this.dataSource.paginator = this.paginator;
      this.loading = false; // Hide loading spinner and enable button
    }, error => {
      this.loading = false; // Ensure loading is set to false in case of error
      // Handle error
    });
  }

  Add() {
    if (!this.loading) {
      this.router.navigate(["/main/brand/brandadd"]);
    }
  }

  editRow(item: any) {
    this.router.navigate(["/main/brand/brandEdit/" + item?._id]);
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
    this.ErpService.deleteBrand(item._id).subscribe((res: any) => {
      this.ErpService.toast.snackbarError("Brand Deleted Successfully");
      this.GetAllevent();
    });
  }

  Search() {
    let filteredData = this.listDate;

    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.name?.toLowerCase().trim().includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}