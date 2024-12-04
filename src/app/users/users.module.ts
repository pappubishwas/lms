import { NgModule } from '@angular/core';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
// import { ApprovalRequestsComponent } from './approval-requests/approval-requests.component';
// import { AllOrdersComponent } from './all-orders/all-orders.component';
// import { ViewUsersComponent } from './view-users/view-users.component';

@NgModule({
  declarations: [
    UserOrdersComponent,
    ProfileComponent,
    // ApprovalRequestsComponent,
    // AllOrdersComponent,
    // ViewUsersComponent,
  ],
  imports: [CommonModule,SharedModule],
  
})
export class UsersModule {}