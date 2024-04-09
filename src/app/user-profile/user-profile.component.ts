import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = {}; // Initialize userData object

  constructor(
    public userRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData(); // Call getUserData when component initializes
  }

  getUserData(): void {
    const username = localStorage.getItem('username'); // Assuming you store the username in localStorage upon login
    if (username) {
      this.userRegistrationService.getUser(username).subscribe(
        (result) => {
          // Populate userData object with fetched user data
          this.userData = result;
          console.log('User Data:', this.userData); // Log userData
        },
        (error) => {
          console.error('Error fetching user data:', error);
          // Handle error (e.g., display error message)
          this.snackBar.open('Failed to fetch user data', 'OK', {
            duration: 2000,
          });
        }
      );
    } else {
      // Handle case where username is not available in localStorage
      console.error('Username not found in localStorage');
      // Redirect user to login or handle appropriately
    }
  }

  editUser(): void {
    console.log('Updated User Data:', this.userData); // Log updated userData before making the request
    this.userRegistrationService.editUser(this.userData).subscribe(
      (result) => {
        // Update userData with the response
        this.userData = result;
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  deleteUser(): void {
    this.userRegistrationService.deleteUser(this.userData.Username).subscribe(
      () => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('User deleted successfully', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.snackBar.open('Failed to delete user', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
