import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule here
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageSideNavComponent } from './components/page-side-nav/page-side-nav.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageTableComponent } from './components/page-table/page-table.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    PageFooterComponent,
    PageSideNavComponent,
    PageNotFoundComponent,
    PageTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    PageHeaderComponent,
    PageFooterComponent,
    PageSideNavComponent,
    RouterModule,
    PageNotFoundComponent,
    PageTableComponent,
  ],
})
export class SharedModule {}
