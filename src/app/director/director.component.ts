import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
   /**
   * Constructor of DirectorComponent.
   * @param {any} data Data passed to the dialog component, containing information about the director.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { director: any }) {}

  ngOnInit(): void {}
}
