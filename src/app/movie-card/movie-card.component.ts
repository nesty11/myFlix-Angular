import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @description Fetches all movies from the API
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * @description Open the synopsys component dialog
   * @param description {string} The movie description is displayed
   */
  public openSynopsisComponent(description: string) {
    this.dialog.open(SynopsisComponent, {
      data: { Description: description },
    });
  }

  /**
   * @description Open the director component dialog
   * @param {any} director The director information is displayed
   */
  public openDirectorComponent(director: any) {
    this.dialog.open(DirectorComponent, {
      data: { director: director },
    });
  }

  /**
   *@description Open the genre component dialog
   * @param {any} genre The genre information is displayed
   */
  public openGenreComponent(genre: any) {
    this.dialog.open(GenreComponent, {
      data: { genre: genre },
    });
  }

  /**
   *@description Add a movie to favorites
   * @param {string} movieID the ID of the movie to add to favorites
   */
  public addFavorite(movieID: string): void {
    this.fetchApiData.addFavoriteMovies(movieID).subscribe(() => {
      // Refresh movies after adding to favorites
      this.getMovies();
    });
  }

  /**
   *@description Remove movie from favorites
   * @param {string} movieID The ID of the movie being removed
   */
  public removeFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(() => {
      // Refresh movies after removing from favorites
      this.getMovies();
    });
  }

  // Check if a movie is a favorite
  /**
   *@description Checks if the movie is favorite or not
   * @param {any} movieID The ID of the movie being checked
   * @returns {boolean} True if the movie is favorite, false if not
   */
  public isFavorite(movieID: any): boolean {
    return this.fetchApiData.isFavoriteMovie(movieID);
  }
}
