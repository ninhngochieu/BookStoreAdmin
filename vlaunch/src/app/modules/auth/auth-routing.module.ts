import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';

const authRoutes: Routes = [
  {
    canActivate: [LoginGuard],
    component: LoginComponent,
    path: 'auth/login',
  },
];
@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
