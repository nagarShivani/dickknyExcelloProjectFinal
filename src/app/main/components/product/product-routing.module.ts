import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';

const routes: Routes = [
  {
    path:'',component:ProductComponent
  },
  {
    path:'productadd',component:ProductAddEditComponent
  },
  {
    path:'productEdit/:id',component:ProductAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
