import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  sidebarVisible: boolean = true;

  constructor( private sidebarService: SidebarService){
    this.sidebarService.sidebarVisible.subscribe(visible => {
      if(this.sidebarVisible){
      this.sidebarVisible = false;
      } else{
      this.sidebarVisible = true;
      }
    });
  }
}
