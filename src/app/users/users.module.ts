import { NgModule } from '@angular/core';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { ApprovalRequestsComponent } from './approval-requests/approval-requests.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { MembershipComponent } from './membership/membership.component';
import { FormsModule } from '@angular/forms';
import { AssignLibrarianComponent } from './assign-librarian/assign-librarian.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    UserOrdersComponent,
    ProfileComponent,
    ApprovalRequestsComponent,
    AllOrdersComponent,
    ViewUsersComponent,
    MembershipComponent,
    AssignLibrarianComponent,
    NotificationComponent,
  ],
  imports: [CommonModule, SharedModule,FormsModule],
})
export class UsersModule {}
