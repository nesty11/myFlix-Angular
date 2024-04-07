import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';

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
      console.log(this.movies);
      return this.movies;
    });
  }

  /* openSynopsisComponent(): void {
    this.dialog.open(SynopsisComponent, {
      width: '300px',
      height: '300px',
    });
  } */

  public openSynopsisComponent(Description: string) {
    this.dialog.open(SynopsisComponent, {
      width: '500px',
      height: '500px',
      data: { Description: Description },
    });
  }

  public openDirectorComponent(director: any) {
    this.dialog.open(DirectorComponent, {
      width: '500px',
      height: '500px',
      data: { director: director },
    });
  }
}
