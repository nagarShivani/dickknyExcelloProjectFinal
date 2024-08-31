import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from './components/color/color.component';
import { ColorAddEditComponent } from './components/color-add-edit/color-add-edit.component';

const routes: Routes = [
  {
    path:'',component:ColorComponent
  },
  {
    path:'coloradd',component:ColorAddEditComponent
  },
  {
    path:'colorEdit/:id',component:ColorAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorRoutingModule { }
