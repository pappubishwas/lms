import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'assign-librarian',
  templateUrl: './assign-librarian.component.html',
  styleUrl: './assign-librarian.component.scss'
})
export class AssignLibrarianComponent {
  username: string = ''; 

  constructor(    private apiService: ApiService,
    private snackBar: MatSnackBar) {}

  sendUsername() {
    if (!this.username.trim()) {
      alert('Username cannot be empty');
      return;
    }
    console.log(this.username);

    this.apiService.assignLibrarian(this.username).subscribe({
      next:(res)=>{
        console.log(res);
        this.snackBar.open(res,'Ok');
      }
    })
}

}
