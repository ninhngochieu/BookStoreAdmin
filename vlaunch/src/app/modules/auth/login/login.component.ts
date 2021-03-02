import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  hide = true;
  loginForm: FormGroup;
  username = '';
  password = '';

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [Validators.required]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): any {
    const formData = this.loginForm.value; // Lấy từ form
    this.authService.login(formData); // Login
  }
}
