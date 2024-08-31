import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { CalenderListComponent } from './components/calender-list/calender-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    CalenderListComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    FullCalendarModule
  ]
})
export class CalenderModule { }
