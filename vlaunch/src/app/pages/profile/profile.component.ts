import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { isEmpty, UploadService } from 'src/app/core/utils';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  profileForm = this.fb.group({
    full_name: ['', Validators.required],
    email: ['', Validators.email],
    avatar: [''],
  });

  passwordForm = this.fb.group({
    old_password: ['', Validators.minLength(8)],
    new_password: ['', Validators.minLength(8)],
  });

  public delete: Function;
  public submit: Function;

  hide = true;
  uploadService = new UploadService();

  ngOnInit(): void {
    this.authService.profile.subscribe((value) => {
      if (isEmpty(value)) return;
      this.profileForm.setValue({
        full_name: value.full_name,
        email: value.email,
        avatar: value.avatar,
      });
    });

    this.submit = this.updateProfile.bind(this);
  }

  updateProfile(): void {
    var formValue = this.profileForm.value;
    var formData = new FormData();

    for (var key in formValue) {
      if (key === 'avatar' || !formValue[key] || formValue[key] == '') continue;
      formData.append(key, formValue[key]);
    }

    if (this.uploadService.imagePath) {
      formData.append('avatar', this.uploadService.imagePath);
    }

    this.authService.updateProfile(formData);
  }

  changePassword(): void {
    this.authService.changePassword(this.passwordForm.value);
  }
}
