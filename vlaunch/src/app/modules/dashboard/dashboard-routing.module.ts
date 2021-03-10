import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { VariantComponent } from 'src/app/pages/variant/variant.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard.component';
import {ProductModifyComponent} from "../../pages/product-modify/product-modify.component";
import {ProductDetailModifyComponent} from "../../pages/product-detail-modify/product-detail-modify.component";

const dashboardRoutes: Routes = [
  {
    // canActivate: [AuthGuard],
    path: 'dashboard',
    // runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        children: [{ path: '', component: HomeComponent }],
      },
      {
        path: 'product',
        children: [
          { path: '', component: ProductsComponent },
          {
            path: ':productID',
            component: ProductDetailComponent,
          },
          { path: ':productID/variant/:id', component: VariantComponent },
        ],
      },
      {
        path: 'product-modify',
        children: [
          { path: '', component: ProductModifyComponent },
          {path: 'add', component: ProductDetailModifyComponent}
          ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
