import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLibrarianComponent } from './assign-librarian.component';

describe('AssignLibrarianComponent', () => {
  let component: AssignLibrarianComponent;
  let fixture: ComponentFixture<AssignLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignLibrarianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
