import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { BrandAddEditComponent } from './components/brand-add-edit/brand-add-edit.component';

const routes: Routes = [
  {
    path:'',component:BrandComponent
  },
  {
    path:'brandadd',component:BrandAddEditComponent
  },
  {
    path:'brandEdit/:id',component:BrandAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
