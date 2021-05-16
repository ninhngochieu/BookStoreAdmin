import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-tool',
  templateUrl: './footer-tool.component.html',
  styleUrls: ['./footer-tool.component.scss'],
})
export class FooterToolComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}

  @Input()
  public delete: any;

  @Input()
  public submit: any;

  @Input()
  public preUrl: [];

  @Input()
  disabledSubmit = false;


  ngOnInit(): void {}

  goBack(): any {
    if (this.preUrl) {
      this.router.navigate(this.preUrl);
    } else {
      this.location.back();
    }
  }
}
