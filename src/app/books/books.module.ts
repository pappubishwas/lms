import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store/book-store.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BookStoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class BooksModule { }
