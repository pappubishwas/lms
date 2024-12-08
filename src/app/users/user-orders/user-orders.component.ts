import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { BorrowedBook } from '../../models/models';
@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
})
export class UserOrdersComponent {

  pendingReturns: BorrowedBook[] = [];
  completedReturns: BorrowedBook[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    let userId = this.apiService.getUserInfo()!.id;
    apiService.getOrders().subscribe({
      next: (res: BorrowedBook[]) => {
        
        this.pendingReturns = res
        .filter((o) => o.status === 0 && o.member.userId==userId)
        .map((order) => ({
          ...order,
          lateFee: this.apiService.getFine(order), 
        }));
        
        this.completedReturns = res.filter((o) => o.status === 1 && userId==o.member.userId);

      },
    });
  }

}