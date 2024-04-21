import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  /**
   * @description Opens the movies page.
   * Navigates to the 'movies' route.
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @description Opens the user profile page.
   * Navigates to the 'profile' route.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @description Logs out the user.
   * Clears user data and token from localStorage, navigates to the welcome page, and displays a logout message.
   */
  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful', 'OK', {
      duration: 2000,
    });
  }
}
