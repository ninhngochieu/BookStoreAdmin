import { NgModule } from '@angular/core';
import {CommonModule, Location} from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/core/material.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { NavService } from 'src/app/components/menu-list-item/nav.service';
import { MenuListItemComponent } from 'src/app/components/menu-list-item/menu-list-item.component';
import { UserMenuComponent } from 'src/app/components/user-menu/user-menu.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterToolComponent } from 'src/app/components/footer-tool/footer-tool.component';
import { VariantComponent } from 'src/app/pages/variant/variant.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { AuthService } from '../auth/auth.service';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import {AvatarPipe, FormatPricePipe, UrlPipe} from '../../core/pipes';

@NgModule({
    declarations: [
        DashboardComponent,
        AvatarPipe,
        FormatPricePipe,
        HomeComponent,
        MenuListItemComponent,
        UserMenuComponent,
        ProductsComponent,
        ProductDetailComponent,
        FooterToolComponent,
        VariantComponent,
        ProfileComponent,
        PaginatorComponent,
        UrlPipe
    ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    FormsModule
  ],
    providers: [NavService, AuthService],
    exports: [
        FooterToolComponent,
        UrlPipe,
        FormatPricePipe
    ]
})
export class DashboardModule {}
