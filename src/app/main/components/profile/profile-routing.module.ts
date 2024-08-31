import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

const routes: Routes = [
  {
    path:':id',component:MyprofileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
