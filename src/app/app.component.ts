import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm';

  constructor(
    private bnIdle: BnNgIdleService,

    private readonly router: Router,
  ){
    this.bnIdle.startWatching(1800).subscribe((res:any) => {
      if(res && this.router.url !='/login') {
        localStorage.clear();
        this.router.navigate(['/login']);

      }
    })
  }
  ngOnInit(): void {
    // Disable right-click context menu
    // document.body.oncontextmenu = () => false;

    // // Disable specific keyboard shortcuts
    // document.onkeydown = (e) => {
    //   if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    //       (e.ctrlKey && e.shiftKey && e.key === 'C') ||
    //       (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    //       (e.ctrlKey && e.key === 'U')) {
    //     e.preventDefault();
    //   }
    // };
  }

}
