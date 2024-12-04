import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreComponent } from './book-store/book-store.component';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ReturnBookComponent } from './return-book/return-book.component';



@NgModule({
  declarations: [
    BookStoreComponent,
    MaintenanceComponent,
    ReturnBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class BooksModule { }
