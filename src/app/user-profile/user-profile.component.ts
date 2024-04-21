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
  userData: any = { Username: '', Email: '' };
  existingUsername: string = '';
  existingEmail: string = '';

  constructor(
    public userRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch user data when the component initializes
    this.userRegistrationService.getOneUser().subscribe((existingUser) => {
      if (existingUser) {
        this.existingUsername = existingUser.Username;
        this.existingEmail = existingUser.Email;
      }
    });
  }

  /**
   * @description Retrieves user data from localStorage.
   * @returns {Observable<any>} An observable that emits the user data.
   */
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

  /**
   * @description Edits user information.
   */
  editUser(): void {
    // If username or email is not provided, use existing values
    if (!this.userData.Username) {
      this.userData.Username = this.existingUsername;
    }

    if (!this.userData.Email) {
      this.userData.Email = this.existingEmail;
    }

    // Call the service to update user information
    this.userRegistrationService.updateUser(this.userData).subscribe(
      (user) => {
        console.log('Edit User Result:', user);
        // Save existing values to update read-only area
        this.existingUsername = user.Username;
        this.existingEmail = user.Email;
        // Reset form values
        this.userData = { Username: '', Email: '' };
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Display success message
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

  /**
   * @description Deletes user account.
   */
  deleteUser(): void {
    // Confirm deletion with user
    if (confirm('Do you want to delete your account permanently?')) {
      // Navigate to welcome page after account deletion
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear(); // Clear localStorage
        // Display deletion confirmation message
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000,
        });
      });
      // Call the service to delete user account
      this.userRegistrationService.deleteUser().subscribe(() => {});
    }
  }
}
