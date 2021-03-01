import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alert,
    public dialogRef: MatDialogRef<AlertComponent>
  ) {}

  ngOnInit(): void {
    //To do;
  }
}
