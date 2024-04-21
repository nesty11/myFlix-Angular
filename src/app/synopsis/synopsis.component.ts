import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent implements OnInit {
   /**
   * Constructor of SynopsisComponent.
   * @param {any} data Data passed to the dialog component, containing information about the synopsis of the movie.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Description: string }) {}

  ngOnInit(): void {}
}
