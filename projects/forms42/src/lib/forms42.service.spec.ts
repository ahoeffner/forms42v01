import { TestBed } from '@angular/core/testing';

import { Forms42Service } from './forms42.service';

describe('Forms42Service', () => {
  let service: Forms42Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Forms42Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
