import { TestBed } from '@angular/core/testing';

import { ProductModifyService } from './product-modify.service';

describe('ProductModifyService', () => {
  let service: ProductModifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductModifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
