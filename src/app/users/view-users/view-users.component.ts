import { Component } from '@angular/core';
import {  Member, User } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss',
})
export class ViewUsersComponent {
  members: Member[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    apiService.getMembers().subscribe({
      next: (res: Member[]) => {
        //console.log("Members: "+res);
        this.members = res.filter((m)=> m.status=="Blocked");
        console.log(this.members[0]);
      },
    });
  }

  unblockUser(member:Member) {
    var id = member.memberId;
    this.apiService.unblock(id).subscribe({
      next: (res) => {
        if (res === 'unblocked') {
          this.snackBar.open('User has been UNBLOCKED!', 'OK');
        } else this.snackBar.open('Not Unblocked', 'OK');
      },
    });
  }
}