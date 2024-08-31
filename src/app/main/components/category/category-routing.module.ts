import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryaddeditComponent } from './components/categoryaddedit/categoryaddedit.component';

const routes: Routes = [
  {
    path:'',component:CategoryComponent
  },
  {
    path:'categoryadd',component:CategoryaddeditComponent
  },
  {
    path:'categoryEdit/:id',component:CategoryaddeditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
