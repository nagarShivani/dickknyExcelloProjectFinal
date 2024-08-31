import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogsAddEditComponent } from './components/blogs-add-edit/blogs-add-edit.component';

const routes: Routes = [
  {
    path:'',component:BlogsComponent
  },
  {
    path:'blogadd',component:BlogsAddEditComponent
  },
  {
    path:'blogEdit/:id',component:BlogsAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
