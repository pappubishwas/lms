import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '../../models/models';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  notifications: Notification[] = [];
  sortedNotifications: Notification[] = [];
  userId?: number;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.fetchNotification();
  }
  fetchNotification() {
    // Get the current user's ID
    this.userId = this.apiService.getUserInfo()!.id;
    console.log('User ID:', this.userId);

    this.apiService.getNotifications().subscribe({
      next: (res: any[]) => { 
        console.log(res);
        this.notifications = res.filter(
          (notification) => notification.userId == this.userId || notification.userId==1
        );
        this.sortedNotifications = this.notifications.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        console.log('Filtered Notifications for user:', this.notifications);
      },
      error: (err) => {
        this.snackBar.open('No Notifications Found', 'OK');
      },
    });
    
    
  }
}
