import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public UserRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  /**
   * @description Opens a dialog
   */
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog';
    this.dialog.open(UserRegistrationFormComponent, dialogConfig);
  }

  /**
   * @description Registers a new user
   * Responsible for sending the form inputs to the backend
   */
  registerUser(): void {
    this.UserRegistrationService.userRegistration(this.userData).subscribe({
      next: (response) => {
        //Logic for a successful user registration goes here. (To be implemented)
        this.dialogRef.close(); //This will close the modal on success
        console.log(response);
        this.snackBar.open('Successfully registered!', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
