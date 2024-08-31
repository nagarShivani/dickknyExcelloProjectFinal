import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment';
import { ErpService } from 'src/app/services/erp.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-calender-list',
  templateUrl: './calender-list.component.html',
  styleUrls: ['./calender-list.component.scss']
})
export class CalenderListComponent {
  calendarOptions: any;
  empid:any=localStorage.getItem('loginid')
  newArrOfEmployeeData: any;
  constructor(private erpService : ErpService){
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: []
    };
    // this.getCurrentEmployeeLeaves()
    this.GetAllUsers()
  }

  // getCurrentEmployeeLeaves(){
  //   let currentYear = new Date().getFullYear()
  //   let data = {
  //     body:{
  //       employeeId:JSON.parse(this.empid), monthYear:currentYear
  //     }
  //   }
  //   this.erpService.getAllpaidAndUnpaid(data).subscribe((res:any)=>{
  //     const { paidLeaves, unpaidLeaves} = res;
  //     if(paidLeaves && unpaidLeaves){
  //       let arr:any = [...paidLeaves, ...unpaidLeaves];
  //       let dateRangeArray:any = [];
  //       arr = arr.map((item:any)=>{
  //         let startDate = new Date(item.startDate);
  //         let endDate = new Date(item.endDate);
  //         for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
  //           let dateinsert = new Date(moment(new Date(new Date(date))).format("MM-DD-yyyy"))
  //             dateRangeArray.push({ title: item?.reason, start: dateinsert });
  //           }
  //         return item;
  //       })
  //       dateRangeArray = Array.from(new Set(dateRangeArray.map((item:any) => item.start)))
  //       .map(start => {
  //         return dateRangeArray.find((item:any) => item.start === start);
  //       });
  //       this.calendarOptions = {
  //         plugins: [dayGridPlugin],
  //         initialView: 'dayGridMonth',
  //         weekends: false,
  //         events: [...dateRangeArray]
  //       };

  //     }
  //   })
  // }
  GetAllUsers() {
    this.erpService.GetAllEmployees().subscribe((employeeRes: any) => {
      this.newArrOfEmployeeData = employeeRes?.data.map((item: any) => {
        if (item?.dob) {
          const currentYear = new Date().getFullYear();
          const newDate = new Date(item.dob);

          item.dob = newDate.setFullYear(currentYear);
          return {
            title: 'birthday of' + ' ' + item?.username  ,
            start: new Date(item?.dob),
            end: new Date(item?.dob)
          };
        } else {
          return null; // Return null for items without dob
        }
      }).filter((obj: any) => obj !== null); // Filter out null objects

      this.erpService.GetAllEvents().subscribe((eventRes: any) => {
        const events = eventRes.data.flatMap((item: any) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          const title = item.title;

          let eventArray = [];
          for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            eventArray.push({
              title: title,
              start: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
              end: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            });
          }
          return eventArray; // Return eventArray instead of events
        });

        // Combine newArrOfEmployeeData with events array
        const combinedEvents = [...this.newArrOfEmployeeData, ...events];

        this.calendarOptions = {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          weekends: true,
          events: combinedEvents
        };
      });
    });
  }

}
