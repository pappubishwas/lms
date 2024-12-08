export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  createdOn: Date;
  role: Role;
  isActive: boolean;
}

export enum Role {
  Admin = "Admin",
  Librarian = "Librarian",
  Member = "Member",
  Guest = "Guest"
}

export interface BookCategory {
  categoryId: number;
  categoryName: string;
  subCategoryName: string;
  description: string;
}

export interface Book {
  bookId: number;
  bookCategoryId: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: Date;
  availableCopies: number;
  status: BookStatus;
  bookCategory?: BookCategory | null;
}

export interface BooksByCategory {
  categoryId: number;
  categoryName: string;
  subCategoryName: string;
  description: string;
  books: Book[];
}

export enum BookStatus {
   "Available",
  "Borrowed",
  "Reserved",
}


export interface Member {
  memberId: number;
  name: string;
  contactDetails: string;
  membershipType: string;
  status: string;
  userId:number;
}



export interface BorrowedBook {
  borrowId: number;
  bookId: number;
  book: Book;
  memberId: number;
  member: Member;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date | null;
  lateFee: number;
  status: BorrowedBookStatus;
}

export enum BorrowedBookStatus {
  "Borrowed",
 "Returned"
}

export interface Reservation {
  reservationId: number;
  bookId: number;
  book: Book;
  memberId: number;
  member: Member;
  reservationDate: Date;
  status: ReservationStatus;
}

export enum ReservationStatus {
  Pending = "Pending",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

export interface Transaction {
  transactionId: number;
  memberId: number;
  member: Member;
  transactionType: TransactionType;
  amount: number;
  date: Date;
  details: string;
}

export enum TransactionType {
  None = "None",
  Fine = "Fine",
  MembershipFee = "MembershipFee"
}

export interface Report {
  reportId: number;
  type: string;
  generatedDate: Date;
  data: string;
  createdBy: number;
  createdByUser: User;
}

export interface Inventory {
  inventoryId: number;
  bookId: number;
  book: Book;
  quantity: number;
  condition: Condition;
  location: string;
}

export enum Condition {
  Good = "Good",
  Damaged = "Damaged",
  Lost = "Lost"
}

export interface BookSearch {
  searchId: number;
  memberId?: number | null;
  member?: Member | null;
  searchQuery: string;
  searchDate: Date;
  resultsCount: number;
}

export interface Notification {
  notificationId: number;
  type: string;
  message: string;
  timestamp: Date;
  userId: number;
}
