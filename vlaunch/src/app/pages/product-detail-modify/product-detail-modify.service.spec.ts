import { TestBed } from '@angular/core/testing';

import { ProductDetailModifyService } from './product-detail-modify.service';

describe('ProductDetailModifyService', () => {
  let service: ProductDetailModifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailModifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
