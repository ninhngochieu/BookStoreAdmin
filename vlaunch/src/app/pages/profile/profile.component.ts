import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { isEmpty, UploadService } from 'src/app/core/utils';
import { AuthService } from 'src/app/modules/auth/auth.service';
import jwtDecode from 'jwt-decode';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    avatar: [''],
  });

  passwordForm = this.fb.group({
    old_password: ['', Validators.minLength(8)],
    new_password: ['', Validators.minLength(8)],
  });

  public delete: any;
  public submit: any;

  hide = true;
  uploadService = new UploadService();
  imgPath = environment.IMG_ROOT;

  ngOnInit(): void {
    this.authService.profile.subscribe((value) => {
      if (isEmpty(value)) { return; }
      this.profileForm.setValue({
        name: value.name,
        email: value.email,
        avatar: value.avatar,
      });
    });
    this.submit = this.updateProfile.bind(this);
  }

  updateProfile(): void {
    const formValue = this.profileForm.value;
    const formData = new FormData();

    for (const key in formValue) {
      if (formValue[key] === '') {
        continue;
      }
      if (!formValue[key]) {
        continue;
      }
      if (key === 'avatar') {
        continue;
      }
      formData.append(key, formValue[key]);
    }
    if (this.uploadService.imagePath) {
      formData.append('avatar', this.uploadService.imagePath);
      console.log(this.uploadService.imagePath);
    }

    console.log(formValue);

    this.authService.updateProfile(formData);
  }

  changePassword(): void {
    this.authService.changePassword(this.passwordForm.value);
  }
}
