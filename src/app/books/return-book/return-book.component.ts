import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { BorrowedBook } from '../../models/models';


@Component({
  selector: 'return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss',
})
export class ReturnBookComponent {
  returnForm: FormGroup;
  fineToPay: number | null = null;

  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.returnForm = fb.group({
      memberId: fb.control(null, [Validators.required]),
      bookId: fb.control(null, [Validators.required]),
    });
  }

  getFine() {
    let memberId = this.returnForm.get('memberId')?.value;
    let bookId = this.returnForm.get('bookId')?.value;

    this.apiService.getOrdersOfUser(memberId).subscribe({
      next: (res: BorrowedBook[]) => {
        console.log(res);

        if (res.some((o) =>  o.bookId == bookId)) {
          let order: BorrowedBook = res.filter((o) => o.bookId == bookId)[0];
          console.log(order);
          this.fineToPay = this.apiService.getFine(order);
          console.log(this.fineToPay);
        } else {
          this.snackBar.open(`User doesn't have Book with ID: ${bookId}`, 'OK');
        }
      },
    });
  }

  returnBook() {
    let memberId = this.returnForm.get('memberId')?.value;
    let bookId = this.returnForm.get('bookId')?.value;

    this.apiService.returnBook(memberId, bookId, this.fineToPay!).subscribe({
      next: (res) => {
        console.log(res);
        if (res === 'returned')
          this.snackBar.open('Book has been Returned!', 'OK');
        else this.snackBar.open('Book has not Returned!', 'OK');
      },
    });
  }
}