import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './components/bill/bill.component';
import { BilladdeditComponent } from './components/billaddedit/billaddedit.component';

const routes: Routes = [
  {
    path:'',component:BillComponent
  },
  {
    path:'billsadd',component:BilladdeditComponent
  },
  {
    path:'eventEdit/:id',component:BilladdeditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
