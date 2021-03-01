import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/alert.service';
import { cleanObj, removeAccents } from 'src/app/core/utils';
import { ProductAttribute } from 'src/app/models/attribute';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/product-type';
import { Spec } from 'src/app/models/spec';
import { Unit } from 'src/app/models/unit';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public productDetailService: ProductDetailService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  productForm = this.fb.group({
    unit_id: [null, Validators.required],
    product_type_id: [null, Validators.required],
    category_id: [null, Validators.required],
    brand_id: [null],
    name: [null, Validators.required],
    price: [null, Validators.required],
    brief: [null],
    content: [null, Validators.required],
  });

  specControls: any[] = [];

  units: Unit[] = [];
  filteredUnits: Observable<Unit[]>;

  categories: Category[] = [];
  filteredCategories: Observable<Category[]>;

  brands: Brand[] = [];
  filteredBrands: Observable<Brand[]>;

  attributes: ProductAttribute[] = [];
  filteredAttributes: Observable<ProductAttribute[]>;

  types: ProductType[] = [];
  filteredTypes: Observable<ProductType[]>;

  product: Product = new Product();
  images: Image[] = [];
  specs: Spec[] = [];

  public delete: Function;
  public submit: Function;
  private subscriptions = new Subscription();

  //radio
  favoriteSeason = 'Winter';
  statuses: any[] = [
    { value: true, name: 'Hiện sản phẩm' },
    { value: false, name: 'Ẩn sản phẩm' },
  ];

  ngOnInit() {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        let productID = params.get('productID');
        this.productDetailService.productID = productID;
        this.productDetailService.method = productID === 'add' ? 'post' : 'put';
        this.productDetailService.init();
      })
    );

    //get units
    this.subscriptions.add(
      this.productDetailService.units$.subscribe((units) => {
        this.units = units;
        this.filteredUnits = this.productForm.get('unit_id').valueChanges.pipe(
          startWith<string | Unit>(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((value) => this._filter(value, this.units))
        );
      })
    );

    // get categories
    this.subscriptions.add(
      this.productDetailService.categories$.subscribe((categories) => {
        this.categories = categories;
        this.filteredCategories = this.productForm
          .get('category_id')
          .valueChanges.pipe(
            startWith<Category | string>(''),
            map((value) => (typeof value === 'string' ? value : value.name)),
            map((value) => this._filter(value, this.categories))
          );
      })
    );

    // get brands
    this.subscriptions.add(
      this.productDetailService.brands$.subscribe((brands) => {
        this.brands = brands;
        this.filteredBrands = this.productForm
          .get('brand_id')
          .valueChanges.pipe(
            startWith<Category | string>(''),
            map((value) =>
              typeof value === 'string' ? value : value ? value.name : ''
            ),
            map((value) => this._filter(value, this.brands))
          );
      })
    );

    //get types
    this.subscriptions.add(
      this.productDetailService.types$.subscribe((types) => {
        this.types = types;
        this.filteredTypes = this.productForm
          .get('product_type_id')
          .valueChanges.pipe(
            startWith<Category | string>(''),
            map((value) =>
              typeof value === 'string' ? value : value ? value.name : ''
            ),
            map((value) => this._filter(value, this.types))
          );
      })
    );

    //get attributes
    this.subscriptions.add(
      this.productDetailService.attributes$.subscribe((attributes) => {
        this.attributes = attributes;
      })
    );

    // get product
    this.subscriptions.add(
      this.productDetailService.product$.subscribe((product) => {
        if (product) {
          this.product = product;
          this.productForm.setValue({
            product_type_id: product.product_type || null,
            unit_id: product.unit || null,
            category_id: product.category || null,
            brand_id: product.brand || null,
            name: product.name || null,
            price: product.price || null,
            brief: product.brief || null,
            content: product.content || null,
          });
        }
      })
    );

    //get product images
    this.subscriptions.add(
      this.productDetailService.images$.subscribe((images) => {
        this.images = images;
      })
    );

    //get product specs
    this.subscriptions.add(
      this.productDetailService.specs$.subscribe((specs) => {
        this.specControls = [];
        this.specs = specs;

        specs.forEach((spec) => {
          let attC = new FormControl();
          let attItemC = new FormControl();
          let filteredAttributes = attC.valueChanges.pipe(
            startWith<ProductAttribute | string>(''),
            tap((value) => {
              if (typeof value == 'object') {
                attItemC.setValue(value['attribute_items'][0]);
              }
            }),
            map((value) =>
              typeof value === 'string' ? value : value ? value.name : ''
            ),
            map((value) => this._filter(value, this.attributes))
          );

          attC.setValue(spec.attribute);
          attItemC.setValue(spec.attribute_item);
          this.specControls.push({ attC, attItemC, filteredAttributes });
        });
      })
    );

    //bind button callback
    if (this.productDetailService.method == 'put') {
      this.delete = this.deleteProduct.bind(this);
    }
    this.submit = this.submitProduct.bind(this);
  }

  deleteImage(image: Image) {
    this.alertService.confirmAlert('Xác nhận xóa hình ảnh', () =>
      this.productDetailService.deleteImage(image.id)
    );
  }

  private _filter(value: any, array: any[]): any[] {
    const filterValue = value.toLowerCase();
    return array.filter(
      (option) =>
        removeAccents(option['name'].toLowerCase()).indexOf(filterValue) !== -1
    );
  }

  public displayProperty(value) {
    if (value && value.name) {
      return value.name;
    }
  }

  uploadImage(file) {
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    data.append('is_main', '0');
    this.productDetailService.updateProductImage(data);
  }

  updateProductStatus(status: MatRadioChange): void {
    const data = { is_published: status.value === true ? '1' : '0' };
    this.productDetailService.updateStatusProduct(data);
  }

  deleteProduct() {
    console.log('delete product');
    this.alertService.confirmAlert('Xác nhận xóa sản phẩm', () =>
      this.productDetailService.deleteProduct()
    );
  }

  addSpec() {
    let newSpecs = [...this.specs];
    let initAttributes = this.attributes[0];
    if (!initAttributes) {
      this.alertService.successAlert('Chưa có dữ liệu thuộc tính.');
      return;
    }

    newSpecs.push(new Spec(initAttributes));
    this.productDetailService.specs = newSpecs;
    this.productDetailService.specs$.next(newSpecs);
  }

  submitProduct() {
    var data = { ...this.productForm.value };

    data.unit_id = data.unit_id ? data.unit_id.id : null;
    data.category_id = data.category_id ? data.category_id.id : null;
    data.brand_id = data.brand_id ? data.brand_id.id : null;
    data.product_type_id = data.product_type_id
      ? data.product_type_id.id
      : null;
    cleanObj(data);

    this.productDetailService.updateProduct(data);
  }

  updateProductSpec(index: number) {
    let data,
      specControl = this.specControls[index];

    try {
      data = {
        attribute_id: specControl.attC.value.id,
        attribute_item_id: specControl.attItemC.value.id,
      };
    } catch (e) {
      console.error('error on updateProductSpec ===>', e);
      data = null;
    }

    if (data) {
      this.productDetailService.updateProductSpec(data, index);
    }
  }

  deleteSpec(index: number) {
    this.alertService.confirmAlert('Xác nhận xóa thuộc tính.', () =>
      this.productDetailService.deleteProductSpec(index)
    );
  }

  variantUrl(id?: number): any {
    let productID = this.productDetailService.productID;
    let arrParams = ['dashboard', 'product', productID, 'variant'];
    if (id) {
      arrParams.push(id.toString());
    } else {
      arrParams.push('add');
    }
    this.router.navigate(arrParams);
  }
}
