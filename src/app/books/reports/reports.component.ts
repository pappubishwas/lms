import { Component, OnInit } from '@angular/core';
import { Book, BorrowedBook, Member, Reservation, User } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'], // Correct usage
})
export class ReportsComponent implements OnInit {
  books: Book[] = [];
  borrowedBooks: BorrowedBook[] = [];
  users: User[] = [];
  members: Member[] = [];
  reservations:Reservation[]=[];

  totalBook: number = 0;
  totalPending:number=0;
  totalReturned:number=0;
  totalLateReturnedBooks:number=0;
  totalLateFeePaid:number=0;
  totalBorrowedBooks:number=0;
  totalReservedBooks:number=0;
  maxBorrowedBookId: number = 0; // Book ID of the most borrowed book
  maxBorrowedCount: number = 0; // Count of the most borrowed book
  maxBorrowedBookDetails: Book | undefined; // Details of the most borrowed book

  totalUsers: number = 0;
  totalMembers: number = 0;
  totalActiveMembers: number = 0;
  totalPremiumMembers: number = 0;
  totalRegularMembers: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.apiService.GetAllBorrowedBooks().subscribe({
      next: (res: BorrowedBook[]) => {
        this.borrowedBooks = res;
       
      },
    });

    this.apiService.getBooks().subscribe({
      next: (res: Book[]) => {
        this.books = res;
        this.calculateBorrowedBookStats();
      },
    });

    this.apiService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
        this.totalUsers = res.length;
      },
    });

    this.apiService.getMembers().subscribe({
      next: (res: Member[]) => {
        this.members = res;
        this.calculateMembershipStats();
      },
    });
    this.apiService.getReservations().subscribe({
      next: (res: Reservation[]) => {
        this.reservations = res;
        console.log(this.reservations);
        this.calculateReservationStats();
      },
    });

  }
  calculateReservationStats() {
    this.totalReservedBooks=this.reservations.length;
  }

  calculateBorrowedBookStats() {
    this.totalBook = this.books.length;
    console.log(this.borrowedBooks);
    const borrowCounts: { [key: number]: number } = {};
    this.borrowedBooks.forEach((book) => {
      borrowCounts[book.bookId] = (borrowCounts[book.bookId] || 0) + 1;
    });
    
    this.totalPending=this.borrowedBooks.filter((m)=> m.status==0).length;
    
    let maxCount: number = 0;
    for (const bookId in borrowCounts) {
      this.totalBorrowedBooks+=1;
      if (borrowCounts[bookId] > maxCount) {
        maxCount = borrowCounts[bookId];
        this.maxBorrowedBookId = +bookId;
      }
    }
    for(var b of this.borrowedBooks){
      if(b.lateFee>0){
        this.totalLateReturnedBooks+=1;
        this.totalLateFeePaid+=b.lateFee;
      }
    }
    this.totalReturned=this.totalBorrowedBooks-this.totalPending;
    this.maxBorrowedCount = maxCount;
    this.maxBorrowedBookDetails = this.books.find(
      (b) => b.bookId === this.maxBorrowedBookId
    );
  }

  calculateMembershipStats() {
    this.totalMembers = this.members.length;
    this.totalActiveMembers = this.members.filter(
      (member) => member.status === 'Active'
    ).length;
    this.totalPremiumMembers = this.members.filter(
      (member) => member.membershipType === 'Premium'
    ).length;
    this.totalRegularMembers = this.totalMembers - this.totalPremiumMembers;
  }
}
