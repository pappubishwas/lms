import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book, BookCategory, BookStatus } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

export interface CategoryOption {
  displayValue: string;
  value: number;
}

@Component({
  selector: 'maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export class MaintenanceComponent {
  newCategory: FormGroup;
  newBook: FormGroup;
  deleteBook: FormControl;
  categoryOptions: CategoryOption[] = [];

  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.newCategory = fb.group({
      category: fb.control('', [Validators.required]),
      subCategory: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required]),
    });

    this.newBook = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      genre: fb.control('', [Validators.required]),
      isbn: fb.control('', [Validators.required]),
      publicationDate: fb.control('', [Validators.required]),
      availableCopies: fb.control(1, [Validators.required]),
      category: fb.control(-1, [Validators.required]),
    });

    apiService.getCategories().subscribe({
      next: (res: BookCategory[]) => {
        res.forEach((c) => {
          this.categoryOptions.push({
            value: c.categoryId,
            displayValue: `${c.categoryName} / ${c.subCategoryName}`,
          });
        });
      },
    });

    this.deleteBook = fb.control('', [Validators.required]);
  }

  addNewCategory() {
    let bookCategory: BookCategory = {
      categoryId: 0,
      categoryName: this.newCategory.get('category')?.value,
      subCategoryName: this.newCategory.get('subCategory')?.value,
      description:this.newCategory.get('description')?.value,
    };
    console.log(bookCategory);
    this.apiService.addNewCategory(bookCategory).subscribe({
      next: (res) => {
        if (res === 'cannot insert') {
          this.snackBar.open('Already Exists!', 'OK');
        } else {
          this.snackBar.open('INSERTED', 'OK');
        }
      },
    });
  }

  addNewBook() {
    let book= {
      bookCategoryId: this.newBook.get('category')?.value,
      title: this.newBook.get('title')?.value,
      author: this.newBook.get('author')?.value,
      genre: this.newBook.get('genre')?.value,
      isbn: this.newBook.get('isbn')?.value,
      publicationDate: this.newBook.get('publicationDate')?.value,
      availableCopies: this.newBook.get('availableCopies')?.value,
    };
    console.log(book);
    this.apiService.addBook(book).subscribe({
      next: (res) => {
         this.snackBar.open(res, 'OK');
      },
      error: (err) => this.snackBar.open('Book does not inserted!', 'OK'),
    });
  }

  deleteExistingBook() {
    let id = this.deleteBook.value;
    this.apiService.deleteBook(id).subscribe({
      next: (res) => {
        if (res === 'deleted')
          this.snackBar.open('Book has been Deleted!', 'OK');
      },
      error: (err) => this.snackBar.open('Book does not Exist!', 'OK'),
    });
  }
}