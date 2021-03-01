import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user_profile';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  profile: UserProfile;

  ngOnInit(): void {
    this.authService.getProfile();
    this.authService.profile.subscribe((value) => {
      this.profile = value;
    });
  }

  ngOnDestroy(): void {}

  logout(): void {
    this.authService.logout();
  }
}
