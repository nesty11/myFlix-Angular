import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
   /**
   * Constructor of GenreComponent.
   * @param {any} data Data passed to the dialog component, containing information about the genre.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}

  ngOnInit(): void {}
}
