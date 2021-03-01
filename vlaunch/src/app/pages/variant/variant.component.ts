import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/core/alert.service';
import { AttributeItem, ProductAttribute } from 'src/app/models/attribute';
import { Image } from 'src/app/models/image';
import { Variant } from 'src/app/models/variant';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { VariantService } from './variant.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
})
export class VariantComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public variantService: VariantService,
    private alertService: AlertService
  ) {}

  variantForm = this.fb.group({
    attributes: this.fb.array([]),
    price_override: [null],
  });

  private dialogRef;
  public delete: Function;
  public submit: Function;
  private subscriptions = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  variant: Variant;
  images: Image[] = [];
  selectImage: Image[] = [];
  productTypeAttribute: ProductAttribute[] = [];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let productID = params.get('productID');
      let variantID = params.get('id');
      this.variantService.productID = productID;
      this.variantService.id = variantID;
      this.variantService.method = variantID === 'add' ? 'post' : 'put';
      this.variantService.init();
      if (this.variantService.preUrl.indexOf(productID) < 0) {
        this.variantService.preUrl.push(productID);
      }

      //bind button callback
      if (this.variantService.method == 'put') {
        this.delete = this.deleteVariant.bind(this);
      } else {
        this.delete = null;
      }
      this.submit = this.submitVariant.bind(this);
    });

    //listen Image
    this.variantService.productDetailService.images$
      .pipe(take(1))
      .subscribe((images) => {
        this.images = images;
      });

    //product detail
    this.subscriptions.add(
      this.variantService.productDetailService.product$.subscribe((product) => {
        if (product) {
          this.variantService.product = product;
          this.variantService.getProductTypeDetail();
        }
      })
    );

    //sub attribute
    this.subscriptions.add(
      this.variantService.productTypeAttribute$.subscribe((attributes) => {
        this.productTypeAttribute = attributes;
        //add control
        var formArray = new FormArray([]);
        var variantAttribute = this.variant ? this.variant.attributes : null;

        this.productTypeAttribute.map((att) => {
          if (variantAttribute) {
            let index = variantAttribute.findIndex((i) => i.id === att.id);
            if (index < 0) return;
            formArray.push(
              this.fb.control(
                variantAttribute[index].attribute_item,
                Validators.required
              )
            );
          } else {
            formArray.push(this.fb.control('', Validators.required));
          }
        });
        this.variantForm.setControl('attributes', formArray);
      })
    );

    // variant detail
    this.subscriptions.add(
      this.variantService.variant$.subscribe((variant) => {
        this.variant = variant;
        this.variantForm.get('price_override').setValue(variant.price_override);
        this.selectImage = variant.images || [];
      })
    );
  }

  get attributes(): FormArray {
    return this.variantForm.get('attributes') as FormArray;
  }

  //open dialog
  openDialog() {
    this.dialogRef = this.dialog.open(ImageDialogComponent, {
      disableClose: false,
      data: {
        images: this.images,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectImage.push(result);
      }
      this.dialogRef = null;
    });
  }

  public displayProperty(value) {
    if (value && value.name) {
      return value.name;
    }
  }

  // delete image
  deleteImage(image) {
    const index = this.selectImage.findIndex((img) => img.id === image.id);
    if (index > -1) {
      this.selectImage.splice(index, 1);
    }
  }

  submitVariant() {
    let data = this.variantForm.value ? this.variantForm.value : {};
    data = {
      ...data,
      name: '',
    };

    data.attributes = this.variantForm.value.attributes.map(
      (item: AttributeItem, index: number) => {
        data.name =
          data.name.length > 0 ? data.name + ' x ' + item.name : item.name;

        return {
          attribute_id: this.productTypeAttribute[index].id,
          attribute_item_id: item.id,
        };
      }
    );
    data.images = [];
    if (this.selectImage.length > 0) {
      data.images = this.selectImage.map((image) => image.id);
    }

    this.variantService.updateProductVariant(data);
  }

  deleteVariant() {
    this.alertService.confirmAlert('Xác nhận xóa biến thể', () =>
      this.variantService.deleteVariant()
    );
  }

  addNewVariant(id?: number) {
    let productID = this.variantService.productID;
    let arrParams = ['dashboard', 'product', productID, 'variant'];
    if (id) {
      arrParams.push(id.toString());
    } else {
      arrParams.push('add');
    }
    this.router.navigate(arrParams).then(() => this.reloadCurrentRoute());
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
