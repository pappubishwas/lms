import { Component } from '@angular/core';
import { Book, BooksByCategory, BookStatus, User } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'book-store',
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss',
})
export class BookStoreComponent {
  filters = {
    publicationYear: '',
    availability: '',
    search:'',
  };
  bookStatus=BookStatus;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];
  books: Book[] = [];
  user:User[]=[];
  booksToDisplay: BooksByCategory[] = [
    {
      categoryId: 1, 
      categoryName: 'C',
      subCategoryName: 'S',
      description: 'pap',
      books: [
        {
          bookId: 1,
          bookCategoryId: 1,
          title: 'T',
          author: 'A',
          genre: 'P',
          isbn: 'wew',
          publicationDate: new Date(), 
          availableCopies: 2,
          status: BookStatus.Available, 
          bookCategory: {
            categoryId: 1, 
            categoryName: '',
            subCategoryName: '',
            description: '',
          },
        },
      ],
    },
  ];
  
  
  currentUserId:number;
  borrowedBooks: number[] = [];
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    apiService.getBooks().subscribe({
      next: (res: Book[]) => {
        //console.log(res);
        this.books = [];
        res.forEach((b) => this.books.push(b));
       // console.log(this.books);
        this.updateList();
        //console.log(this.booksToDisplay);
      },
    });
    let u = apiService.getUserInfo()!;
    this.currentUserId=u.id;
    console.log(this.currentUserId);
    apiService.getBorrowedBookListOfUser(u.id).subscribe({
      next:(res:[])=>{
        this.borrowedBooks=res;
        console.log(this.borrowedBooks);
      },
    });
  }

  updateList() {
    this.booksToDisplay = [];
  
    for (const book of this.books) {
      // Find if a category already exists in booksToDisplay
      const existingCategory = this.booksToDisplay.find(
        (category) => category.categoryId === book.bookCategoryId
      );
  
      if (existingCategory) {
        // Add the book to the existing category
        existingCategory.books.push(book);
      } else {
        // Add a new category with the book
        this.booksToDisplay.push({
          categoryId: book.bookCategoryId, 
          categoryName: book.bookCategory?.categoryName || '', 
          subCategoryName: book.bookCategory?.subCategoryName || '', 
          description: book.bookCategory?.description || '', 
          books: [book], 
        });
      }
    }
  }
  
  
  performAdvancedSearch() {
    this.updateList();

    // Filter books based on advanced filters
    console.log(this.filters.publicationYear);
    const publicationYear = this.filters.publicationYear;
    const availability = this.filters.availability.trim();
    const search=this.filters.search;
    console.log(search);
    this.booksToDisplay = this.booksToDisplay.filter((bookToDisplay) => {
      bookToDisplay.books = bookToDisplay.books.filter((book) => {
        const matchesPublicationYear =
        !publicationYear || 
        new Date(book.publicationDate).getFullYear().toString() == publicationYear;
      
        const matchesAvailability =
          !availability ||
          (availability === 'available' && book.availableCopies > 0) ||
          (availability === 'borrowed' && book.availableCopies === 0);
  
          const matchSearch = search && book.title.toLowerCase().includes(search.toLowerCase());
        return matchesPublicationYear && matchesAvailability && matchSearch;
      });
      return bookToDisplay.books.length > 0;
    });
  
    const resultsCount = this.getBookCount();
  
    // Log the advanced search filters and results count
    console.log('Advanced filters:', this.filters);
    console.log(`Results Count: ${resultsCount}`);


    this.apiService.logSearch({
      memberId: this.currentUserId,
      searchQuery: this.filters.search+", "+this.filters.publicationYear+", "+this.filters.availability, 
      resultsCount: resultsCount,
    }).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
    
  }
  searchBooks(value: string) {
    this.updateList();
    value = value.toLowerCase();
    this.booksToDisplay = this.booksToDisplay.filter((bookToDisplay) => {
      bookToDisplay.books = bookToDisplay.books.filter((book) => {
        return book.title.toLowerCase().includes(value);
      });
      return bookToDisplay.books.length > 0;
    });
    const resultsCount = this.getBookCount();

  }

  getBookCount() {
    let count = 0;
    this.booksToDisplay.forEach((b) => (count += b.books.length));
    return count;
  }


  isBookBorrowed(bId: number): boolean {
    return this.borrowedBooks.includes(bId);
  }

  
  orderBook(book: Book) {
    // console.log(book);
    
    this.apiService.orderBook(book).subscribe({
      next: (res) => {
        this.snackBar.open(res,'OK');
      },
    });
  }


  reserveBook(book: Book): void {
    console.log(`Reserving book with ID: ${book.bookId}`);
    this.apiService.reserveBook(book).subscribe({
      next:(res)=>{
        console.log(res);
        this.snackBar.open(res,"Ok");
      }
    })
  }
  

}