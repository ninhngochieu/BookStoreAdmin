import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user_profile';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService) {}

  profile: UserProfile;

  ngOnInit(): void {
    this.authService.profile.subscribe((profile) => {
      this.profile = profile;
    });
  }
}
