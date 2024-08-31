import { SizeModule } from './components/size/size.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MyprofileComponent } from './components/profile/components/myprofile/myprofile.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
    ,children:[
      { path: 'dashboard',
      loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'employee',
      loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule)},
      { path: 'profile',
      loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),},
      { path: 'category',
      loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule),
    },
    { path: 'product',
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule),
    },
      { path: 'bill',
      loadChildren: () => import('./components/bill/bill.module').then(m => m.BillModule),

    },
    { path: 'users',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),

    },
    { path: 'coupon',
    loadChildren: () => import('./components/coupon/coupon.module').then(m => m.CouponModule),

    },
    { path: 'brand',
    loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule),

    },
    { path: 'rating',
    loadChildren: () => import('./components/rating/rating.module').then(m => m.RatingModule),

    },
    { path: 'color',
    loadChildren: () => import('./components/color/color.module').then(m => m.ColorModule),

    },
    { path: 'size',
    loadChildren: () => import('./components/size/size.module').then(m => m.SizeModule),

    },
 
    { path: 'blog',
    loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule),

    },
 


    ],

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
