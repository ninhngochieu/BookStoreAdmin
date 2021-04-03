import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/core/alert.service';
import { HttpService } from 'src/app/core/http.service';
import { ProductAttribute } from 'src/app/models/attribute';
import { Product } from 'src/app/models/product';
import { Variant } from 'src/app/models/variant';
import { ProductDetailService } from '../product-detail/product-detail.service';

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  constructor(
    private http: HttpService,
    private alertService: AlertService,
    private router: Router,
    public productDetailService: ProductDetailService
  ) {}

  public preUrl = ['dashboard', 'product'];
  public productID: string;
  public id: any;
  public method: string;
  public product: Product = new Product();
  private variants: Variant[];

  public productTypeAttribute$ = new Subject<ProductAttribute[]>();
  public variant$ = new Subject<Variant>();
  public variants$ = new Subject<Variant[]>();

  init(): any {
    this.productDetailService.productID = this.productID;
    this.productDetailService.getProductImages();
    this.productDetailService.getProductDetail();
    this.getVariants();
    this.variant$.next(new Variant());

    if (this.method === 'put') {
      this.getVariantDetail();
    }
  }

  getVariants(): any {
    const url = 'product/' + this.productID + '/variants';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.variants$.next(res.data);
        this.variants = res.data;
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getVariantDetail(): any {
    const url = 'product/' + this.productID + '/variant/' + this.id;
    this.http.getHandle(url).subscribe((res) => {
      if (res && res.success) {
        this.variant$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
        this.router.navigate(['dashboard', 'product', this.productID]);
      }
    });
  }

  getProductTypeDetail(): any {
    const url = 'product-type/' + this.product.product_type.id;
    this.http.getHandle(url).subscribe((res) => {
      if (res && res.success) {
        this.productTypeAttribute$.next(res.data.attributes);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  updateProductVariant(data): any {
    this.alertService.showProgress();
    if (this.method === 'post') {
      const url = 'product/' + this.productID + '/variants';
      this.http.postHandle(url, data).subscribe((res) => {
        if (res && res.success) {
          this.variants.push(res.data);
          this.variants$.next(this.variants);
          this.alertService.successAlert('Tạo biến thể thành công.');
          this.method = 'put';
          this.id = res.data.id;
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    } else {
      const url = 'product/' + this.productID + '/variant/' + this.id;
      this.http.putHandle(url, data).subscribe((res) => {
        if (res && res.success) {
          this.alertService.successAlert('Cập nhật biến thể thành công.');
          const index = this.variants.findIndex((i) => i.id === res.data.id);
          if (index < 0) { return; }
          this.variants[index] = res.data;
          this.variants$.next(this.variants);
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    }
  }

  deleteVariant(): any {
    const url = 'product/' + this.productID + '/variant/' + this.id;
    this.http.deleteHandle(url, {}).subscribe((res) => {
      if (res && res.success) {
        this.alertService.successAlert('Xóa biến thể thành công.');
        this.router.navigate(['dashboard', 'product', this.productID]);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }
}
