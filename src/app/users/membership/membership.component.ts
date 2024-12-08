import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Member, User } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'], 
})
export class MembershipComponent implements OnInit{
  user: User | null = null; 
  member: Member[] = [];
  text: string = ''; 
  selectedMembership: string = ''; 

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    
  }

  // checkMemberShipType(){
  //   if(this.member[0].membershipType)
  // }

  ngOnInit(): void {
    const user = this.apiService.getUserInfo();
    this.user = user; 

    if (user?.role === 'Guest') {

      this.text =
        "You don't have any membership. For accessing the books, you need to become a member. Thank you. For Regular membership you need to pay 50rs monthly with this you can maximum borrow 3 books at a time and each book for 10 days. For Premium membership you need to pay 80rs and you can borrow maximum 6 books and You can keep a book for 12 days. For Membership click on the Below button!";
    } else if (user?.role === 'Member') {
      
      this.apiService.getMember(user.id).subscribe({
        next: (res: Member[]) => {
          
          this.member=res;
          if(this.member[0].membershipType==="Regular"){
            this.text="Your Membership is regular. You can upgrade your membership to premium to get more benefits. Thank you!"
          }
        },
        error: (err) => {
          console.error('Error fetching member details:', err);
        },
      });
    }
  }
  
  onSubmit(): void {
    console.log('Selected Membership:', this.selectedMembership);

    if (!this.user) {
      this.snackBar.open('No user information found', 'OK', { duration: 3000 });
      return;
    }

    const m = {
      name: `${this.user.firstName} ${this.user.lastName}`, 
      contactDetails: `${this.user.mobileNumber} , ${this.user.email}`,
      membershipType: this.selectedMembership,
      status: "Inactive",
      userId: this.user.id,
    };
    this.apiService.membership(m).subscribe({
      next: (res) => {
        this.snackBar.open('Membership request sent successfully', 'OK', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open('Membership request failed', 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
