import { AuthRoutingModule } from './auth/auth-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginguardGuard } from './guard/loginguard.guard';
import { AuthenticationGuard } from './guard/authentication.guard';


const routes: Routes = [


  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),canActivate:[LoginguardGuard]  },
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthenticationGuard] },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate:[AuthenticationGuard]},
  { path: '**', redirectTo: '/login' },


  // { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),canActivate:[LoginguardGuard]  },
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthenticationGuard] },
  // { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate:[AuthenticationGuard]},
  // { path: '**', redirectTo: '/login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
