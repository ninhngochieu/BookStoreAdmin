import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from './core/material.module';
import { QUILL_CONFIG } from './data/datas';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HeroesModule } from './modules/heroes/heroes.module';
import { ImageDialogComponent } from './pages/variant/image-dialog/image-dialog.component';
import { ProductModifyComponent } from './pages/product-modify/product-modify.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ProductDetailModifyComponent } from './pages/product-detail-modify/product-detail-modify.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { OrderComponent } from './pages/order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlertComponent,
    ImageDialogComponent,
    ProductModifyComponent,
    ProductDetailModifyComponent,
    UserManagerComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    QuillModule.forRoot({modules: QUILL_CONFIG}),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    HeroesModule,
    DashboardModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
