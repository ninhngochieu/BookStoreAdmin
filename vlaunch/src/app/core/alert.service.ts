import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public dialog: MatDialog, private router: Router) {}

  alert: Alert = {};
  public progress$ = new BehaviorSubject<boolean>(false);
  private dialogRef;

  public showProgress(): void {
    this.progress$.next(true);
  }

  public hideProgress(): void {
    this.progress$.next(false);
  }

  errorAlert(res): void {
    if (res && res.error_code === 'token_not_valid') {
      localStorage.clear();
      window.location.reload();
    }

    this.alert.type = 'error';
    this.alert.message = res ? res.error_message : 'Lỗi hệ thống';
    this.alert.error_code = res ? res.error_code : null;
    this.open();
  }

  successAlert(message): void {
    this.alert.message = message;
    this.alert.type = 'success';
    this.open();
  }

  confirmAlert(message: string, callback: any): any {
    this.alert.message = message;
    this.alert.type = 'confirm';
    this.alert.callback = callback;
    this.openConfirm();
  }

  private open(): void {
    this.dialog.open(AlertComponent, {
      data: this.alert,
      panelClass: 'global-dialog',
    });
  }

  private openConfirm(): void {
    this.dialogRef = this.dialog.open(AlertComponent, {
      data: this.alert,
      disableClose: false,
      panelClass: 'global-dialog',
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alert.callback();
      }
      this.dialogRef = null;
    });
  }

  private clear(): void {
    this.alert = null;
  }
}
