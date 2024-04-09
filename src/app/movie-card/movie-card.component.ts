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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  public openSynopsisComponent(description: string) {
    this.dialog.open(SynopsisComponent, {
      width: '500px',
      height: '500px',
      data: { Description: description },
    });
  }

  public openDirectorComponent(director: any) {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      height: '500px',
      data: { director: director },
    });
  }

  public openGenreComponent(genre: any) {
    this.dialog.open(GenreComponent, {
      width: '400px',
      height: '300px',
      data: { genre: genre },
    });
  }

  // Add movie to favorites
  public addFavorite(movieID: string): void {
    this.fetchApiData.addFavoriteMovies(movieID).subscribe(() => {
      // Refresh movies after adding to favorites
      this.getMovies();
    });
  }

  // Remove movie from favorites
  public removeFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(() => {
      // Refresh movies after removing from favorites
      this.getMovies();
    });
  }

  // Check if a movie is a favorite
  public isFavorite(movieID: any): boolean {
    // Assuming you have a method in UserRegistrationService to check if a movie is a favorite
    return this.fetchApiData.isFavoriteMovie(movieID);
  }
}
