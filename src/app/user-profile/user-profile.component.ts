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
  userData: any = { Username: '', Password: '', Email: '' };
  newPassword: string = '';
  existingUsername: string = '';
  existingEmail: string = '';

  constructor(
    public userRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const username = localStorage.getItem('user');
    if (username) {
      console.log('Fetching user data for username:', username);
      this.userRegistrationService.getOneUser(username).subscribe(
        (result) => {
          console.log('User data retrieved successfully:', result);
          this.userData = result;
          this.existingUsername = result.Username;
          this.existingEmail = result.Email;
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.snackBar.open('Failed to fetch user data', 'OK', {
            duration: 2000,
          });
        }
      );
    } else {
      console.error('Username not found in localStorage');
    }
  }

  editUser(): void {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    this.userData.Username = currentUser.Username;

    if (this.newPassword) {
      this.userData.Password = this.newPassword;
    }

    this.userRegistrationService.editUser(this.userData).subscribe(
      (result) => {
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
