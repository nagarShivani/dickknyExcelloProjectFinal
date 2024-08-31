import { Component, ElementRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "../../../employee/components/confirm-dialog/confirm-dialog.component";
import * as moment from "moment";
import { PDFExportComponent } from "@progress/kendo-angular-pdf-export";
import jsPDF from "jspdf";
import { ErpService } from "./../../../../../services/erp.service";

@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.scss"],
})
export class BillComponent {
  loading?: boolean = true;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    "code",
    "productName",
    "discountValue",
    "totalAmount",
    "billdate",
    "Action",
    "invoice",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("pdfExportComponent") pdfExportComponent!: PDFExportComponent;

  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  moment: any = moment;
  searchfilter: any;
  listDate: any;
  userInfoObj: any;

  constructor(
    private ErpService: ErpService,
    public router: Router,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {
    let userInfo: any = localStorage.getItem("userInfo");
    this.userInfoObj = userInfo ? JSON.parse(userInfo) : "";
    this.GetAllevent();
  }

  GetAllevent() {
    this.ErpService.getAllBills().subscribe((res: any) => {
      this.loading = true;
      this.listDate = res?.bills;
      this.dataSource.data = res?.bills;

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
    this.ErpService.deleteBill(item._id).subscribe((res: any) => {
      this.ErpService.toast.snackbarError("Bill Deleted Successfully");
      this.GetAllevent();
    });
  }

  Search() {
    let filteredData = this.listDate;

    if (this.searchfilter) {
      filteredData = filteredData.filter((val: any) =>
        val?.userId?.email
          ?.toLowerCase()
          .trim()
          .includes(this.searchfilter?.toLowerCase().trim())
      );
    }

    this.dataSource.data = filteredData;
  }

  exportToPDF() {
    this.pdfExportComponent.saveAs();
  }

  // generatePDF1(element: any) {
  //   if (!element) {
  //     console.error("No data provided for PDF generation.");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   doc.setFontSize(12);

  //   // Title
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.text("Invoice", 105, 20, { align: "center" });

  //   // Date
  //   doc.setFontSize(12);
  //   doc.text(
  //     `Date: ${
  //       element.createdAt
  //         ? moment(element.createdAt).format("DD-MM-YYYY")
  //         : "N/A"
  //     }`,
  //     160,
  //     30
  //   );

  //   // Customer details
  //   doc.setFont("helvetica", "normal");
  //   doc.text(
  //     `Customer Name: ${element.userId?.firstName || "N/A"} ${
  //       element.userId?.lastName || "N/A"
  //     }`,
  //     10,
  //     40
  //   );

  //   const address = element?.userId?.multipleAddressArray?.[0];
  //   let addressY = 50; // Starting Y-coordinate for the address section

  //   // Address lines
  //   doc.text(`Customer Address:`, 10, addressY);
  //   addressY += 10;
  //   doc.text(`${element.userId?.email || "N/A"}`, 10, addressY);
  //   addressY += 10;
  //   doc.text(
  //     `${address?.houseNumber || "N/A"}, ${address?.streetAddress || "N/A"}`,
  //     10,
  //     addressY
  //   );
  //   addressY += 10;
  //   doc.text(
  //     `${address?.city || "N/A"}, ${address?.state || "N/A"}`,
  //     10,
  //     addressY
  //   );
  //   addressY += 10;
  //   doc.text(
  //     `${address?.country || "N/A"}, ${address?.postcode || "N/A"}`,
  //     10,
  //     addressY
  //   );

  //   // Table headers
  //   doc.setLineWidth(0.1);
  //   doc.line(10, addressY + 10, 220, addressY + 10);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Product Name", 10, addressY + 20);
  //   doc.text("Price", 80, addressY + 20);
  //   doc.text("Quantity", 120, addressY + 20);
  //   doc.text("Amount", 160, addressY + 20);
  //   doc.text("GST (18%)", 200, addressY + 20);
  //   doc.line(10, addressY + 22, 220, addressY + 22);

  //   // Product details
  //   let startY = addressY + 30; // Adjust startY to be below the table headers
  //   let totalProductAmount = 0;
  //   let totalGST = 0;

  //   if (element.products && element.products.length > 0) {
  //     element.products.forEach((product: any) => {
  //       let productAmount = product.productId?.salePrice || 0;
  //       let productQty = product.productQty || 0;
  //       let productName = product.productId?.name || "N/A";

  //       let amount = productAmount * productQty;
  //       let gst = ((amount * 18) / 100).toFixed(2); // Calculate GST (18% of total product amount)
  //       totalProductAmount += amount;
  //       totalGST += parseFloat(gst);

  //       doc.setFont("helvetica", "normal");
  //       doc.text(productName, 10, startY);
  //       doc.text(productAmount.toString(), 80, startY);
  //       doc.text(productQty.toString(), 120, startY);
  //       doc.text(amount.toFixed(2), 160, startY);
  //       doc.text(gst.toString(), 200, startY);

  //       startY += 10;
  //     });
  //   } else {
  //     doc.setFont("helvetica", "normal");
  //     doc.text("No products available", 10, startY);
  //     startY += 10;
  //   }

  //   // Total amount (product total + GST)
  //   let totalAmount = totalProductAmount + totalGST;

  //   startY += 10;
  //   doc.setFont("helvetica", "bold");
  //   doc.text(
  //     `Total Product Amount: ${totalProductAmount.toFixed(2)}`,
  //     140,
  //     startY
  //   );
  //   startY += 10;
  //   doc.text(`Total GST (18%): ${totalGST.toFixed(2)}`, 140, startY);
  //   startY += 10;
  //   doc.text(
  //     `Total Amount (incl. GST): ${totalAmount.toFixed(2)}`,
  //     140,
  //     startY
  //   );

  //   // Footer
  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.text(
  //     "Thank you for your purchase!",
  //     105,
  //     doc.internal.pageSize.height - 10,
  //     { align: "center" }
  //   );

  //   // Save the PDF
  //   doc.save("invoice.pdf");
  // }

  // generatePDF1(element: any) {
  //   if (!element) {
  //     console.error("No data provided for PDF generation.");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   const rightMargin = 20; // Define right margin size
  //   const pageWidth = doc.internal.pageSize.width;

  //   doc.setFontSize(12);

  //   // Title
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

  //   // Date
  //   doc.setFontSize(12);
  //   doc.text(
  //     `Date: ${
  //       element.createdAt
  //         ? moment(element.createdAt).format("DD-MM-YYYY")
  //         : "N/A"
  //     }`,
  //     pageWidth - rightMargin,
  //     30,
  //     { align: "right" }
  //   );

  //   // Customer details
  //   doc.setFont("helvetica", "normal");
  //   doc.text(
  //     `Customer Name: ${element.userId?.firstName || "N/A"} ${
  //       element.userId?.lastName || "N/A"
  //     }`,
  //     10,
  //     40
  //   );

  //   const address = element?.userId?.multipleAddressArray?.[0];
  //   let addressY = 50; // Starting Y-coordinate for the address section

  //   // Address lines
  //   doc.text(`Customer Address:`, 10, addressY);
  //   addressY += 10;
  //   doc.text(`${element.userId?.email || "N/A"}`, 10, addressY);
  //   addressY += 10;
  //   doc.text(
  //     `${address?.houseNumber || "N/A"}, ${address?.streetAddress || "N/A"}`,
  //     10,
  //     addressY
  //   );
  //   addressY += 10;
  //   doc.text(
  //     `${address?.city || "N/A"}, ${address?.state || "N/A"}`,
  //     10,
  //     addressY
  //   );
  //   addressY += 10;
  //   doc.text(
  //     `${address?.country || "N/A"}, ${address?.postcode || "N/A"}`,
  //     10,
  //     addressY
  //   );

  //   // Table headers
  //   doc.setLineWidth(0.1);
  //   doc.line(10, addressY + 10, pageWidth - rightMargin, addressY + 10);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Product Name", 10, addressY + 20);
  //   doc.text("Price", 70, addressY + 20);
  //   doc.text("Quantity", 110, addressY + 20);
  //   doc.text("Amount", 150, addressY + 20);
  //   doc.text("GST (18%)", pageWidth - rightMargin, addressY + 20, {
  //     align: "right",
  //   });
  //   doc.line(10, addressY + 22, pageWidth - rightMargin, addressY + 22);

  //   // Product details
  //   let startY = addressY + 30; // Adjust startY to be below the table headers
  //   let totalProductAmount = 0;
  //   let totalGST = 0;

  //   if (element.products && element.products.length > 0) {
  //     element.products.forEach((product: any) => {
  //       let productAmount = product.productId?.salePrice || 0;
  //       let productQty = product.productQty || 0;
  //       let productName = product.productId?.name || "N/A";

  //       let amount = productAmount * productQty;
  //       let gst = ((amount * 18) / 100).toFixed(2); // Calculate GST (18% of total product amount)
  //       totalProductAmount += amount;
  //       totalGST += parseFloat(gst);

  //       doc.setFont("helvetica", "normal");
  //       doc.text(productName, 10, startY);
  //       doc.text(productAmount.toString(), 70, startY);
  //       doc.text(productQty.toString(), 110, startY);
  //       doc.text(amount.toFixed(2), 150, startY);
  //       doc.text(gst.toString(), pageWidth - rightMargin, startY, {
  //         align: "right",
  //       });

  //       startY += 10;
  //     });
  //   } else {
  //     doc.setFont("helvetica", "normal");
  //     doc.text("No products available", 10, startY);
  //     startY += 10;
  //   }

  //   // Total amount (product total + GST)
  //   let totalAmount = totalProductAmount + totalGST;

  //   startY += 10;
  //   doc.setFont("helvetica", "bold");
  //   doc.text(
  //     `Total Product Amount: ${totalProductAmount.toFixed(2)}`,
  //     pageWidth - rightMargin,
  //     startY,
  //     { align: "right" }
  //   );
  //   startY += 10;
  //   doc.text(
  //     `Total GST (18%): ${totalGST.toFixed(2)}`,
  //     pageWidth - rightMargin,
  //     startY,
  //     { align: "right" }
  //   );
  //   startY += 10;
  //   doc.text(
  //     `Total Amount (incl. GST): ${totalAmount.toFixed(2)}`,
  //     pageWidth - rightMargin,
  //     startY,
  //     { align: "right" }
  //   );

  //   // Footer
  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.text(
  //     "Thank you for your purchase!",
  //     pageWidth / 2,
  //     doc.internal.pageSize.height - 10,
  //     { align: "center" }
  //   );

  //   // Save the PDF
  //   doc.save("invoice.pdf");
  // }
  // generatePDF1(element: any) {
  //   if (!element) {
  //     console.error("No data provided for PDF generation.");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   const rightMargin = 20; // Define right margin size
  //   const pageWidth = doc.internal.pageSize.width;

  //   doc.setFontSize(12);

  //   // Title
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

  //   // Date
  //   doc.setFontSize(12);
  //   doc.text(
  //     `Date: ${
  //       element.createdAt
  //         ? moment(element.createdAt).format("DD-MM-YYYY")
  //         : "N/A"
  //     }`,
  //     pageWidth - rightMargin,
  //     30,
  //     { align: "right" }
  //   );

  //   // Customer details
  //   doc.setFont("helvetica", "normal");
  //   doc.text(
  //     `Customer Name: ${element.userId?.firstName || "N/A"} ${
  //       element.userId?.lastName || "N/A"
  //     }`,
  //     10,
  //     40
  //   );

  //   const address = element?.userId?.multipleAddressArray?.[0];
  //   let addressY = 50; // Starting Y-coordinate for the address section

  //   // Address lines
  //   doc.text(`Customer Address:`, 10, addressY);
  //   addressY += 10;
  //   doc.text(`${element.userId?.email || "N/A"}`, 10, addressY);
  //   addressY += 10;
  //   doc.text(
  //     `${address?.houseNumber || "N/A"}, ${address?.streetAddress || "N/A"}`,
  //     10,
  //     addressY
  //   );
  //   addressY += 10;
  //   doc.text(
  //     `${address?.city || "N/A"}, ${address?.state || "N/A"}`,
  //     10,
  //     addressY
  //   );
  //   addressY += 10;
  //   doc.text(
  //     `${address?.country || "N/A"}, ${address?.postcode || "N/A"}`,
  //     10,
  //     addressY
  //   );

  //   // Table headers
  //   doc.setLineWidth(0.1);
  //   doc.line(10, addressY + 10, pageWidth - rightMargin, addressY + 10);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Product Name", 10, addressY + 20);
  //   doc.text("Price", 70, addressY + 20);
  //   doc.text("Quantity", 110, addressY + 20);
  //   doc.text("Amount", 140, addressY + 20); // Adjusted X-coordinate
  //   doc.text("GST (18%)", pageWidth - rightMargin, addressY + 20, {
  //     align: "right",
  //   });
  //   doc.line(10, addressY + 22, pageWidth - rightMargin, addressY + 22);

  //   // Product details
  //   let startY = addressY + 30; // Adjust startY to be below the table headers
  //   let totalProductAmount = 0;
  //   let totalGST = 0;

  //   if (element.products && element.products.length > 0) {
  //     element.products.forEach((product: any) => {
  //       let productAmount = product.productId?.salePrice || 0;
  //       let productQty = product.productQty || 0;
  //       let productName = product.productId?.name || "N/A";

  //       let amount = productAmount * productQty;
  //       let gst = ((amount * 18) / 100).toFixed(2); // Calculate GST (18% of total product amount)
  //       totalProductAmount += amount;
  //       totalGST += parseFloat(gst);

  //       doc.setFont("helvetica", "normal");
  //       doc.text(productName, 10, startY);
  //       doc.text(productAmount.toString(), 70, startY);
  //       doc.text(productQty.toString(), 110, startY);
  //       doc.text(amount.toFixed(2), 140, startY); // Adjusted X-coordinate
  //       doc.text(gst.toString(), pageWidth - rightMargin, startY, {
  //         align: "right",
  //       });

  //       startY += 10;
  //     });
  //   } else {
  //     doc.setFont("helvetica", "normal");
  //     doc.text("No products available", 10, startY);
  //     startY += 10;
  //   }

  //   // Total amount (product total + GST)
  //   let totalAmount = totalProductAmount + totalGST;

  //   startY += 10;
  //   doc.setFont("helvetica", "bold");
  //   doc.text(
  //     `Total Product Amount: ${totalProductAmount.toFixed(2)}`,
  //     140, // Adjusted X-coordinate
  //     startY,
  //     { align: "right" }
  //   );
  //   startY += 10;
  //   doc.text(
  //     `Total GST (18%): ${totalGST.toFixed(2)}`,
  //     140, // Adjusted X-coordinate
  //     startY,
  //     { align: "right" }
  //   );
  //   startY += 10;
  //   doc.text(
  //     `Total Amount (incl. GST): ${totalAmount.toFixed(2)}`,
  //     140, // Adjusted X-coordinate
  //     startY,
  //     { align: "right" }
  //   );

  //   // Footer
  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.text(
  //     "Thank you for your purchase!",
  //     pageWidth / 2,
  //     doc.internal.pageSize.height - 10,
  //     { align: "center" }
  //   );

  //   // Save the PDF
  //   doc.save("invoice.pdf");
  // }
  generatePDF1(element: any) {
    if (!element) {
      console.error("No data provided for PDF generation.");
      return;
    }

    const doc = new jsPDF();
    const rightMargin = 20; // Define right margin size for general text
    const pageWidth = doc.internal.pageSize.width;
    const detailRightMargin = 20; // Reduced margin for right-aligned details

    doc.setFontSize(12);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

    // Date
    doc.setFontSize(12);
    doc.text(
      `Date: ${
        element.createdAt
          ? moment(element.createdAt).format("DD-MM-YYYY")
          : "N/A"
      }`,
      pageWidth - rightMargin,
      30,
      { align: "right" }
    );

    // Customer details
    doc.setFont("helvetica", "normal");
    doc.text(
      `Customer Name: ${element.userId?.firstName || "N/A"} ${
        element.userId?.lastName || "N/A"
      }`,
      10,
      40
    );

    const address = element?.userId?.multipleAddressArray?.[0];
    let addressY = 50; // Starting Y-coordinate for the address section

    // Address lines
    doc.text(`Customer Address:`, 10, addressY);
    addressY += 10;
    doc.text(`${element.userId?.email || "N/A"}`, 10, addressY);
    addressY += 10;
    doc.text(
      `${address?.houseNumber || "N/A"}, ${address?.streetAddress || "N/A"}`,
      10,
      addressY
    );
    addressY += 10;
    doc.text(
      `${address?.city || "N/A"}, ${address?.state || "N/A"}`,
      10,
      addressY
    );
    addressY += 10;
    doc.text(
      `${address?.country || "N/A"}, ${address?.postcode || "N/A"}`,
      10,
      addressY
    );

    // Table headers
    doc.setLineWidth(0.1);
    doc.line(10, addressY + 10, pageWidth - rightMargin, addressY + 10);
    doc.setFont("helvetica", "bold");
    doc.text("Product Name", 10, addressY + 20);
    doc.text("Price", 70, addressY + 20);
    doc.text("Quantity", 110, addressY + 20);
    doc.text("Amount", 140, addressY + 20); // Adjusted X-coordinate
    doc.text("GST (18%)", pageWidth - rightMargin, addressY + 20, {
      align: "right",
    });
    doc.line(10, addressY + 22, pageWidth - rightMargin, addressY + 22);

    // Product details
    let startY = addressY + 30; // Adjust startY to be below the table headers
    let totalProductAmount = 0;
    let totalGST = 0;

    if (element.products && element.products.length > 0) {
      element.products.forEach((product: any) => {
        let productAmount = product.productId?.salePrice || 0;
        let productQty = product.productQty || 0;
        let productName = product.productId?.name || "N/A";

        let amount = productAmount * productQty;
        let gst = ((amount * 18) / 100).toFixed(2); // Calculate GST (18% of total product amount)
        totalProductAmount += amount;
        totalGST += parseFloat(gst);

        doc.setFont("helvetica", "normal");
        doc.text(productName, 10, startY);
        doc.text(productAmount.toString(), 70, startY);
        doc.text(productQty.toString(), 110, startY);
        doc.text(amount.toFixed(2), 140, startY); // Adjusted X-coordinate
        doc.text(gst.toString(), pageWidth - rightMargin, startY, {
          align: "right",
        });

        startY += 10;
      });
    } else {
      doc.setFont("helvetica", "normal");
      doc.text("No products available", 10, startY);
      startY += 10;
    }

    // Total amount (product total + GST)
    let totalAmount = totalProductAmount + totalGST;

    startY += 10;
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total Product Amount: ${totalProductAmount.toFixed(2)}`,
      pageWidth - detailRightMargin, // Adjusted X-coordinate
      startY,
      { align: "right" }
    );
    startY += 10;
    doc.text(
      `Total GST (18%): ${totalGST.toFixed(2)}`,
      pageWidth - detailRightMargin, // Adjusted X-coordinate
      startY,
      { align: "right" }
    );
    startY += 10;
    doc.text(
      `Total Amount (incl. GST): ${totalAmount.toFixed(2)}`,
      pageWidth - detailRightMargin, // Adjusted X-coordinate
      startY,
      { align: "right" }
    );

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Thank you for your purchase!",
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save("invoice.pdf");
  }
}
