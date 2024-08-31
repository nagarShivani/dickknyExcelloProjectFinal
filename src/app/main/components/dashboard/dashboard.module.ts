import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MatDialogModule } from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { NotificationComponent } from "./components/notification/notification.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatSelectModule } from "@angular/material/select";
@NgModule({
  declarations: [DashboardComponent, NotificationComponent],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    NgApexchartsModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    NgApexchartsModule,
  ],
})
export class DashboardModule {}
