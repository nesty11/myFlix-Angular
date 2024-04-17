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
  userData: any = { Username: ''/* , Password: '' */, Email: '' };
  existingUsername: string = '';
  existingEmail: string = '';
/*   existingPassword: string = '';
 */
  constructor(
    public userRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRegistrationService.getOneUser().subscribe((existingUser) => {
      if (existingUser) {
        this.existingUsername = existingUser.Username;
        this.existingEmail = existingUser.Email;
/*         this.existingPassword = existingUser.Password;
 */      }
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
    if (!this.userData.Username) {
      this.userData.Username = this.existingUsername;
    }

    if (!this.userData.Email) {
      this.userData.Email = this.existingEmail;
    }

   /*  if (!this.userData.Password) {
      this.userData.Password = this.existingPassword;
    } */

    this.userRegistrationService.updateUser(this.userData).subscribe(
      (user) => {
        console.log('Edit User Result:', user);
        // save existing values so read only area is updated
        this.existingUsername = user.Username;
        this.existingEmail = user.Email;
        /* this.existingPassword = user.Password; */
        // reset form values
        this.userData = { Username: '', /* Password: '' */ Email: '' };
        // update localStorage
        localStorage.setItem('user', JSON.stringify(user));
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
