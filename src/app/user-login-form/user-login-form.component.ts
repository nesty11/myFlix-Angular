import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public UserRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * @description Logs in a user.
   * Calls the userLogin method of UserRegistrationService to perform login.
   * If login is successful, saves user data and token to localStorage and closes the dialog.
   * If login fails, displays a snack bar message.
   */
  loginUser(): void {
    this.UserRegistrationService.userLogin(this.userData).subscribe(
      (result) => {
        console.log('User data from login:', result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open('Logged in', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
