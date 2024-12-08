import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Member, User } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'approval-requests',
  templateUrl: './approval-requests.component.html',
  styleUrl: './approval-requests.component.scss',
})
export class ApprovalRequestsComponent {

  members: Member[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    apiService.GetAllMembers().subscribe({
      next: (res: Member[]) => {
        //console.log("Members: "+res);
        this.members = res;
        console.log(this.members[0]);
      },
    });
  }

  approve(member: Member): void {
    this.apiService.approveRequest(member.memberId).subscribe({
      next: (res) => {
        if (res === 'approved') {
          this.snackBar.open(`Approved for ${member.memberId}`, 'OK');
        } else {
          this.snackBar.open(`Not Approved`, 'OK');
        }
  

        setTimeout(() => {
          window.location.reload();  
        }, 1000);
      },
      error: (err) => {
        console.error('Error approving member:', err);
        this.snackBar.open('Error occurred while approving', 'OK');
      }
    });
  }
  

}