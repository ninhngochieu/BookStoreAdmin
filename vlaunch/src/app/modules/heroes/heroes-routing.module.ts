import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

const heroesRoutes: Routes = [
  {
    canActivate: [AuthGuard],
    path: 'hero',
    children: [
      {
        path: '',
        children: [
          { path: 'heroes', component: HeroListComponent },
          { path: ':id', component: HeroDetailComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
