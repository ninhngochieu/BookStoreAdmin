import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavService } from 'src/app/components/menu-list-item/nav.service';
import { NAV_ITEMS } from 'src/app/data/datas';
import { NavItem } from 'src/app/models/menu_item';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkLogin();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navItems: NavItem[] = NAV_ITEMS;
}
