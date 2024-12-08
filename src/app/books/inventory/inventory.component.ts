import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventories: any[] = [];
  newInventory = {
    bookId: '',
    quantity: 0,
    condition: '',
    location: ''
  };

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadInventories();
  }

  loadInventories() {
    this.apiService.getAllInventories().subscribe((data) => {
      console.log(data);
      this.inventories = data;
    });
  }

  deleteInventory(id: number) {
    this.apiService.deleteInventory(id).subscribe(() => {
      this.loadInventories();
    });
  }
}
