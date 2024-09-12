import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexMarkers,
  ApexFill,
} from "ng-apexcharts";
import { ErpService } from "src/app/services/erp.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  fill: ApexFill;
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  orders: any[] = [];
  statusOptions = [
    "Pending",
    "Transit",
    "Out for Delivery",
    "Completed",
    "Return Requested",
    "Return Received",
  ];
  displayedColumns: string[] = [
    "productname",
    "productimage",
    "customer",
    "quantity",
    "price",
    "gst",
    "newCol",
    "totalprice",
    "status",
    // "action",
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild("chart") chart: ChartComponent = {} as ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptionss: Partial<ChartOptions> | any;

  constructor(private ErpService: ErpService, private http: HttpClient) {
    this.chartOptions = {
      series: [
        {
          name: "Total sale on behalf of Month",
          data: [
            { x: "Jan", y: [10, 20] },
            { x: "Feb", y: [25, 40] },
            { x: "Mar", y: [90, 50] },
            { x: "Apr", y: [75, 45] },
            { x: "May", y: [13, 22] },
            { x: "Jun", y: [35, 40] },
            { x: "Jul", y: [45, 60] },
            { x: "Aug", y: [28, 50] },
            { x: "Sep", y: [65, 85] },
            { x: "Oct", y: [20, 40] },
            { x: "Nov", y: [19, 50] },
            { x: "Dec", y: [1, 7] },
          ],
        },
      ],
      chart: {
        height: 350,
        type: "rangeArea",
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Total Sales",
      },
      markers: {
        hover: {
          sizeOffset: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        min: 25,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => {
            return val + "%";
          },
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          colorStops: [
            {
              offset: 0,
              // color: "#003E70",
              color: "#00508D",

              opacity: 1,
            },
            {
              offset: 100,
              color: "#00508D",
              // color: "#003E70",
              opacity: 1,
            },
          ],
        },
      },
    };
    this.chartOptionss = {
      series: [
        {
          name: "Sale",
          data: [41, 50, 25, 34, 55, 64, 49, 42, 85, 52, 59, 39],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "Sale",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        min: 25,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => {
            return val + "%";
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          colorStops: [
            {
              offset: 0,
              color: "#00508D",

              opacity: 1,
            },
            {
              offset: 100,
              color: "#00508D", // End color
              opacity: 1,
            },
          ],
        },
      },
    };

    this.ErpService.getAllOrders().subscribe((res: any) => {
      this.dataSource.data = res?.orders;
      console.log("check", this.dataSource.data);
    });
  }
  // update order status
  // updateOrderStatus(order: any) {
  //   const orderId = order._id;
  //   const newStatus = order.status;

  //   this.http
  //     .put(`/api/updateOrderStatus/${orderId}`, { status: newStatus })
  //     .subscribe(
  //       (response) => {
  //         console.log("Order status updated new", response);
  //       },
  //       (error) => {
  //         console.error("Error updating order status new", error);
  //       }
  //     );
  // }
  updateOrderStatus(order: any) {
    const orderId = order._id;
    const newStatus = order.status;

    this.http
      .put(`https://backend.dickkny.com/updateOrderStatus/${orderId}`, {
        status: newStatus,
      })
      .subscribe(
        (response) => {
          console.log("Order status updated successfully", response);
        },
        (error) => {
          console.error("Error updating order status", error);
        }
      );
  }

  //  CUSTOMISED GST
  getProductGst(product: any): number {
    return (parseInt(product.productId.price) * 18) / 100;
  }

  //

  // getGst(item: any) {
  //   let getgst = 0;
  //   item?.products.map((result: any) => {
  //     getgst += (parseInt(result?.productId?.price) * 18) / 100;
  //     // console.log(getgst, "sdouds8");
  //   });
  //   return getgst;
  // }
}
