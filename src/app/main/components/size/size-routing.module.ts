import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SizeComponent } from './components/size/size.component';
import { SizeAddEditComponent } from './components/size-add-edit/size-add-edit.component';

const routes: Routes = [
  {
    path:'',component:SizeComponent
  },
  {
    path:'sizeadd',component:SizeAddEditComponent
  },
  {
    path:'sizeEdit/:id',component:SizeAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeRoutingModule { }
