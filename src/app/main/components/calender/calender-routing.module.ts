import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderListComponent } from './components/calender-list/calender-list.component';

const routes: Routes = [
  {
    path:'',component:CalenderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
