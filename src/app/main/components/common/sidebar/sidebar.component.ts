import { ErpService } from 'src/app/services/erp.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarVisible: boolean = true;

  MenuArr:any[]=[
    {
      "name": "Dashboard",
      "route":"/main/dashboard",
      "icon": "fa fa-th-large" ,

      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Category",
      "route":"/main/category",
      "icon": "fa fa-calendar",
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Brand",
      "route":"/main/brand",
      "icon": "fa fa-calendar",
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Color",
      "route":"/main/color",
      "icon": "fa fa-th-large" ,
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Size",
      "route":"/main/size",
      "icon": "fa fa-th-large" ,
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Product",
      "route":"/main/product",
      "icon": "fa fa-calendar",
      "isSubfolder": false,
      "submenu": []
    },

    {
      "name": "Users",
      "route":"/main/users",
      "icon": "fa fa-calendar",
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Coupon",
      "route":"/main/coupon",
      "icon": "fa fa-calendar",
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Bill",
      "route":"/main/bill",
      "icon": "fa fa-calendar",
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Rating",
      "route":"/main/rating",
      "icon": "fa fa-th-large" ,
      "isSubfolder": false,
      "submenu": []
    },
    {
      "name": "Blog",
      "route":"/main/blog",
      "icon": "fa fa-th-large" ,
      "isSubfolder": false,
      "submenu": []
    },


  ]

  constructor(private router :Router,
    private ErpService:ErpService,
    private cookieService: CookieService,
    private sidebarService: SidebarService
    ){
      let userInfo:any = localStorage.getItem('userInfo');
      userInfo = userInfo ? JSON.parse(userInfo): '';

  }

  ngOnInit(){
    this.sidebarService.sidebarVisible.subscribe(visible => {
      if(this.sidebarVisible){
      this.sidebarVisible = false;
      } else{
      this.sidebarVisible = true;
      }
    });
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login']);
    this.ErpService.toast.snackbarSuccess('Logout Successfully!')



  }
  toggleSubmenu(event: Event, item: any) {
    event.preventDefault();
    item.isOpen = !item.isOpen;
  }

  toggleSubfolder(item: any) {
    item.isOpen = !item.isOpen;
  }
}
