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
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent {
  loading?: boolean = true;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    "firstname",
    "lastName",
    "email",
    "phone",
    "Status",
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

    this.GetAllevent();
  }
  GetAllevent() {
    this.ErpService.getAllUsers().subscribe((res: any) => {
      console.log("get all users:", res);
      this.loading = true;
      let resdata1 = res;
      console.log("res", resdata1);
      this.listDate = res?.user;

      this.dataSource.data = res?.user;

      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  Add() {
    this.router.navigate(["/main/users/useradd"]);
  }

  editRow(item: any) {
    this.router.navigate(["/main/users/userEdit/" + item?._id]);
  }

  deleteRow(item: any) {
    console.log("delete user check", item);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("delete confirm", result);
        this.calldeleteItemApi(item);
        // console.log("delete confirm dialog", this.calldeleteItemApi(item));
      }
    });
  }

  calldeleteItemApi(item: any) {
    console.log("delete item api test", item);
    this.ErpService.deleteUser(item._id).subscribe((res: any) => {
      console.log("response of delete item api", res);
      this.ErpService.toast.snackbarError("User  Deleted Successfully");

      this.GetAllevent();
    });
  }

  Search() {
    let filteredData = this.listDate;

    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.firstName
          ?.toLowerCase()
          .trim()
          .includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}
