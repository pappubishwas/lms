import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Role } from '../../../models/models';

export interface NavigationItem {
  value: string;
  link: string;
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss',
})
export class PageSideNavComponent {
  panelName: string = 'Auth Panel';
  navItems: NavigationItem[] = [];

  constructor(private apiService: ApiService, private router: Router) {
    apiService.userStatus.subscribe({
      next: (status) => {
        if (status == 'loggedIn') {
          router.navigateByUrl('/home');
          
          let user = apiService.getUserInfo();
          //console.log(user);
          if (user != null) {
            if (user.role == Role.Admin) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                
                { value: 'Return Book', link: '/return-book' },
                { value: 'Reports', link: '/reports' },
                { value: 'Blocked Members', link: '/view-users' },
                { value: 'Membership Requests', link: '/approval-requests' },
                { value: 'Assgin Librarian', link: '/assgin-librarian' },
                { value: 'All Orders', link: '/all-orders' },
                
              ];
            } else if (user.role == Role.Member) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'My Orders', link: '/my-orders' },
                { value: 'Membership Status', link: '/membership' },
                { value: 'Notifications', link: '/notifications' },
              ];
            }else if(user.role==Role.Librarian){
              this.panelName = 'Librarian Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'Add/Remove Books', link: '/maintenance' },
                { value: 'Inventory', link: '/inventory' },
                { value: 'Reports', link: '/reports' },
                
              ];
            }
            else{
              this.navItems=[
              { value: 'View Books', link: '/home' },
              { value: 'Membership Status', link: '/membership' },
              ];
            }
          }
        } else if (status == 'loggedOff') {
          this.panelName = 'Auth Panel';
          router.navigateByUrl('/login');
          this.navItems = [];
        }
      },
    });
  }
  trackByLink(index: number, item: NavigationItem): string {
    return item.link;
  }
}