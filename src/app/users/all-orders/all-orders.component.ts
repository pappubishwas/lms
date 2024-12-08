import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { BorrowedBook } from '../../models/models';

@Component({
  selector: 'all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent {
  showProgressBar: boolean = false;
  ordersWithPendingReturns: BorrowedBook[] = [];
  ordersWithCompletedReturns: BorrowedBook[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.showProgressBar = true;

    this.apiService.getOrders().subscribe({
      next: (res: BorrowedBook[]) => {
        this.ordersWithPendingReturns = res
          .filter((o) => o.status === 0)
          .map((order) => ({
            ...order,
            lateFee: this.apiService.getFine(order),
          }));

        this.ordersWithCompletedReturns = res.filter((o) => o.status === 1);
        this.showProgressBar = false;
      },
      error: (err) => {
        this.snackBar.open('No Orders Found', 'OK');
        this.showProgressBar = false;
      },
    });
  }

  sendEmail() {
    this.showProgressBar = true;
    this.apiService.sendEmail().subscribe({
      next: (res) => {
        if (res === 'sent') {
          this.snackBar.open(
            'Emails have been Sent to respected Students!',
            'OK'
          );
          this.showProgressBar = false;
        } else {
          this.snackBar.open('Emails have not been sent!', 'OK');
          this.showProgressBar = false;
        }
      },
    });
  }

  blockUsers() {
    this.showProgressBar = true;
    this.apiService.blockUsers().subscribe({
      next: (res) => {
        if (res === 'blocked') {
          this.snackBar.open('Eligible Users Accounts were BLOCKED!', 'OK');
          this.showProgressBar = false;
        } else {
          this.snackBar.open('Not BLOCKED!', 'OK');
          this.showProgressBar = false;
        }
      },
    });
  }

  membershipRenewal() {
    this.apiService.membershipRenewal().subscribe({
      next: (res) => {
        this.snackBar.open(res, 'Ok');
      },
    });
  }
}
