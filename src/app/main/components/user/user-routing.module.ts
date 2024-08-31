import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';

const routes: Routes = [
  {
    path:'',component:UserComponent
  },
  {
    path:'useradd',component:UserAddEditComponent
  },
  {
    path:'userEdit/:id',component:UserAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
