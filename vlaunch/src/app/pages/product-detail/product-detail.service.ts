import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertService } from 'src/app/core/alert.service';
import { HttpService } from 'src/app/core/http.service';
import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { Spec } from 'src/app/models/spec';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(
    private http: HttpService,
    private alertService: AlertService,
    private router: Router
  ) {}

  public productID: string;
  public method: string = 'post';
  public specs: Spec[] = [];
  private images: Image[] = [];
  public preUrl = ['dashboard', 'product'];

  units$ = new Subject<[]>();
  categories$ = new Subject<[]>();
  brands$ = new Subject<[]>();
  attributes$ = new Subject<[]>();
  types$ = new Subject<[]>();
  product$ = new Subject<Product>();
  images$ = new Subject<Image[]>();
  specs$ = new Subject<Spec[]>();
  variants$ = new Subject<Spec[]>();

  init() {
    this.getUnits();
    this.getCategories();
    this.getBrands();
    this.getTypes();

    if (this.method === 'put') {
      this.getAttribute();
      this.getProductDetail();
      this.getProductImages();
      this.getProductSpec();
      this.getVariants();
    } else {
      this.product$.next(null);
    }
  }

  getUnits() {
    const url = 'unit';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.units$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getCategories() {
    const url = 'category';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.categories$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getBrands() {
    const url = 'brand';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.brands$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getTypes() {
    const url = 'product-type';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.types$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  updateProduct(data): any {
    let url = 'product';
    this.alertService.showProgress();
    if (this.method === 'post') {
      this.http.post(url, data).subscribe((res) => {
        if (res && res.success) {
          this.alertService.successAlert('Tạo sản phẩm thành công.');
          this.router.navigate(['/dashboard', 'product', res.data.id]);
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    } else {
      url = url + '/' + this.productID;
      this.http.put(url, data).subscribe((res) => {
        if (res && res.success) {
          this.product$.next(res.data);
          this.alertService.successAlert(
            'Cập nhật thông tin sản phẩm thành công.'
          );
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    }
  }

  deleteProduct() {
    const url = 'product/' + this.productID;
    this.alertService.showProgress();
    this.http.delete(url).subscribe((res) => {
      if (res && res.success) {
        this.alertService.successAlert('Xóa sản phẩm thành công.');
        this.router.navigateByUrl('dashboard/product');
      } else {
        this.alertService.errorAlert(res);
      }

      this.alertService.hideProgress();
    });
  }

  getProductDetail() {
    const url = 'product/' + this.productID;
    this.alertService.showProgress();
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.product$.next(res.data);
      } else {
        this.router.navigateByUrl('dashboard/product');
        this.alertService.errorAlert(res);
      }

      this.alertService.hideProgress();
    });
  }

  getVariants() {
    const url = 'product/' + this.productID + '/variants';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.variants$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  updateStatusProduct(data: object) {
    const url = 'product/' + this.productID + '/publish';
    this.http.put(url, data).subscribe((res) => {
      if (res && res.success) {
        // this.product$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getProductImages() {
    const url = 'product/' + this.productID + '/images';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.images$.next(res.data);
        this.images = res.data;
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  updateProductImage(data: FormData) {
    const url = 'product/' + this.productID + '/images';
    this.alertService.showProgress();
    this.http.post(url, data).subscribe((res) => {
      if (res && res.success) {
        this.images.push(res.data);
        this.images$.next(this.images);
        this.alertService.successAlert('Tải ảnh lên thành công.');
      } else {
        this.alertService.errorAlert(res);
      }

      this.alertService.hideProgress();
    });
  }

  deleteImage(imgID) {
    const url = 'product/' + this.productID + '/image/' + imgID;
    this.http.delete(url).subscribe((res) => {
      if (res && res.success) {
        this.images = this.images.filter((item) => item.id != imgID);
        this.images$.next(this.images);
        this.alertService.successAlert('Xóa ảnh thành công.');
      } else {
        this.alertService.errorAlert(res);
      }

      this.alertService.hideProgress();
    });
  }

  getAttribute() {
    const url = 'attribute';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.attributes$.next(res.data);
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  getProductSpec() {
    const url = 'product/' + this.productID + '/specs';
    this.http.get(url).subscribe((res) => {
      if (res && res.success) {
        this.specs$.next(res.data);
        this.specs = res.data;
      } else {
        this.alertService.errorAlert(res);
      }
    });
  }

  updateProductSpec(data, index?: number) {
    let id = this.specs[index] ? this.specs[index].id : null;
    this.alertService.showProgress();
    if (id) {
      let url = 'product/' + this.productID + '/spec/' + id;
      this.http.put(url, data).subscribe((res) => {
        if (res && res.success) {
          this.alertService.successAlert('Cập nhật thuộc tính thành công.');
          this.updateLocalSpecs(index, res.data);
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    } else {
      let url = 'product/' + this.productID + '/specs';
      this.http.post(url, data).subscribe((res) => {
        if (res && res.success) {
          this.alertService.successAlert('Thêm thuộc tính thành công.');
          this.updateLocalSpecs(index, res.data);
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    }
  }

  private updateLocalSpecs(index: number, spec: Spec) {
    this.specs[index] = spec;
    this.specs$.next(this.specs);
  }

  deleteProductSpec(index: number) {
    let id = this.specs[index] ? this.specs[index].id : null;
    if (id) {
      this.alertService.showProgress();
      const url = 'product/' + this.productID + '/spec/' + id;
      this.http.delete(url).subscribe((res) => {
        if (res && res.success) {
          this.alertService.successAlert('Xóa thuộc tính thành công.');
          this.specs.splice(index, 1);
          this.specs$.next(this.specs);
        } else {
          this.alertService.errorAlert(res);
        }

        this.alertService.hideProgress();
      });
    } else {
      this.specs.splice(index, 1);
      this.specs$.next(this.specs);
    }
  }
}
