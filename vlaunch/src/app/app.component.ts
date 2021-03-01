import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './core/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public alertService: AlertService) {}

  progress = false;

  ngOnInit(): void {
    console.log(environment.CONFIG_CHECK);
    this.alertService.progress$.subscribe((process) => {
      setTimeout(() => {
        this.progress = process;
      }, 0);
    });
  }
}
