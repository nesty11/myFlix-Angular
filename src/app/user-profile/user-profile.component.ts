import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = { Username: '', Password: '', Email: '' };
  newPassword: string = '';
  newUsername: string = '';
  newEmail: string = '';
  existingUsername: string = '';
  existingEmail: string = '';

  constructor(
    public userRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData().subscribe((userData) => {
      if (userData) {
        this.existingUsername = userData.Username;
        this.existingEmail = userData.Email;
      }
    });
  }

  getUserData(): Observable<any> {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const { Username, Email } = userData;
      return new Observable((observer) => {
        observer.next({ Username, Email });
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  editUser(): void {
    this.getUserData().subscribe((userData) => {
      if (userData) {
        const oldUsername = userData.Username;
        console.log('Old Username:', oldUsername);

        if (this.newUsername) {
          console.log('New Username:', this.newUsername);
          userData.Username = this.newUsername;
        }

        if (this.newEmail) {
          console.log('New Email:', this.newEmail);
          userData.Email = this.newEmail;
        }

        if (this.newPassword) {
          console.log('New Password:', this.newPassword);
          userData.Password = this.newPassword;
        }

        console.log('Updated User Data:', userData);

        this.userRegistrationService
          .updateUser(oldUsername, userData)
          .subscribe(
            (result) => {
              console.log('Edit User Result:', result);
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
      } else {
        console.error('User data not found');
      }
    });
  }

  deleteUser(): void {
    if (confirm('Do you want to delete your account permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000,
        });
      });
      this.userRegistrationService.deleteUser().subscribe(() => {});
    }
  }
}
