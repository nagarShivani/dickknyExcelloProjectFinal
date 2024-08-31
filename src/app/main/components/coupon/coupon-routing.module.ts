import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponComponent } from './components/coupon/coupon.component';
import { CouponAddEditComponent } from './components/coupon-add-edit/coupon-add-edit.component';

const routes: Routes = [
  {
    path:'',component:CouponComponent
  },
  {
    path:'couponadd',component:CouponAddEditComponent
  },
  {
    path:'couponEdit/:id',component:CouponAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
