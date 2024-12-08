import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, map } from 'rxjs';
import {
  Book,
  BookCategory,
  BorrowedBook,
  Member,
  Reservation,
  Role,
  User,
} from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://localhost:7210/api/Library/';
  userStatus: Subject<string> = new Subject();
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getUser(): Observable<{ username: string; email: string }[]> {
    return this.http.get<{ username: string; email: string }[]>(
      this.baseUrl + 'GetUser'
    );
  }

  register(user: any) {
    return this.http.post(this.baseUrl + 'Register', user, {
      responseType: 'text',
    });
  }

  login(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }

  isLoggedIn(): boolean {
    if (
      localStorage.getItem('access_token') != null &&
      !this.jwt.isTokenExpired()
    )
      return true;
    return false;
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodedToken = this.jwt.decodeToken();
    var user: User = {
      id: decodedToken.id,
      username: decodedToken.username,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: Role[decodedToken.role as keyof typeof Role],
      isActive: decodedToken.isActive,
      createdOn: decodedToken.createdOn,
      password: '',
    };
    return user;
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.userStatus.next('loggedOff');
  }

  getBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'GetBooks');
  }

  GetAllMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'GetAllMembers');
  }
  
  GetAllBorrowedBooks(){
    return this.http.get<BorrowedBook[]>(this.baseUrl + 'GetAllBorrowedBooks');
  }

  getMember(id: number) {
    return this.http.get<Member[]>(`${this.baseUrl}GetMember?id=${id}`);
  }

  membership(member: any) {
    //console.log(member);
    return this.http.post(this.baseUrl + 'Membership', member, {
      responseType: 'text',
    });
  }
  
  logSearch(searchDetails: { memberId: number; searchQuery: string; resultsCount: number }) {
    return this.http.post(this.baseUrl + 'LogSearch', {
        userId: searchDetails.memberId,
        query: searchDetails.searchQuery,
        count: searchDetails.resultsCount,
    }, {
        responseType: 'text', 
    });
}

  

  orderBook(book: Book) {
    //console.log(book);
    let userId = this.getUserInfo()!.id;
    let params = new HttpParams()
      .append('userId', userId)
      .append('bookId', book.bookId);
    console.log(params);
    return this.http.post(this.baseUrl + 'OrderBook', null, {
      params: params,
      responseType: 'text',
    });
  }

  getBorrowedBookListOfUser(userId: number) {
    return this.http.get<[]>(
      `${this.baseUrl}GetBorrowedBookListOfUser?userId=${userId}`
    );
  }

  getOrdersOfUser(memberId: number) {
    let params = new HttpParams().append('memberId', memberId);
    return this.http.get<any>(this.baseUrl + 'GetOrdersOfUser', {
      params: params,
    });
  }

  getFine(order: BorrowedBook) {
    let today = new Date();
    let dueDate = new Date(order.dueDate);

    if (dueDate.getTime() < today.getTime()) {
      let diff = today.getTime() - dueDate.getTime();

      let days = Math.floor(diff / (1000 * 60 * 60 * 24));

      return days * 30;
    }

    return 0;
  }

  assignLibrarian(username: string) {
    return this.http.get(this.baseUrl + 'AssignLibrarian', {
      params: new HttpParams().append('username', username),
      responseType: 'text',
    });
  }

  addNewCategory(category: BookCategory) {
    return this.http.post(this.baseUrl + 'AddCategory', category, {
      responseType: 'text',
    });
  }

  getCategories() {
    return this.http.get<BookCategory[]>(this.baseUrl + 'GetCategories');
  }

  addBook(book: any) {
    //console.log(book);
    return this.http.post(this.baseUrl + 'AddBook', book, {
      responseType: 'text',
    });
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteBook', {
      params: new HttpParams().append('id', id),
      responseType: 'text',
    });
  }

  returnBook(memberId: string, bookId: string, fine: number) {
    return this.http.get(this.baseUrl + 'ReturnBook', {
      params: new HttpParams()
        .append('memberId', memberId)
        .append('bookId', bookId)
        .append('fine', fine),
      responseType: 'text',
    });
  }

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'GetUsers');
  }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'GetMembers');
  }

  getReservations(){
    return this.http.get<Reservation[]>(this.baseUrl+'GetReservations');
  }

  approveRequest(memberId: number) {
    return this.http.get(this.baseUrl + 'ApproveRequest', {
      params: new HttpParams().append('memberId', memberId),
      responseType: 'text',
    });
  }

  reserveBook(book:Book){
    console.log(book);
    let userId = this.getUserInfo()!.id;
    let params = new HttpParams()
      .append('userId', userId)
      .append('bookId', book.bookId);
    console.log(params);
    return this.http.post(this.baseUrl + 'ReserveBook', null, {
      params: params,
      responseType: 'text',
    });
  }


  getOrders() {
    return this.http.get<any>(this.baseUrl + 'GetOrders');
  }

  getNotifications(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.baseUrl + 'GetNotifications');
  }
  sendEmail() {
    return this.http.get(this.baseUrl + 'SendEmailForPendingReturns', {
      responseType: 'text',
    });
  }

  blockUsers() {
    return this.http.get(this.baseUrl + 'BlockFineOverdueUsers', {
      responseType: 'text',
    });
  }

  unblock(userId: number) {
    return this.http.get(this.baseUrl + 'Unblock', {
      params: new HttpParams().append('userId', userId),
      responseType: 'text',
    });
  }

  membershipRenewal(){
    return this.http.get(this.baseUrl + 'MembershipRenewalNotification', {
      responseType: 'text',
    });
  }


  getAllInventories(): Observable<any> {
    return this.http.get(this.baseUrl+"GetAllInventories");
  }

  

  updateInventory(id: number, inventory: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<any> {
    // Include the id in the URL as a query parameter
    return this.http.delete(`${this.baseUrl}DeleteInventories?id=${id}`);
  }
  
  
}
