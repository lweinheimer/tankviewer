import { TestBed } from '@angular/core/testing';

import { DatahubService } from './datahub.service';

describe('DatahubService', () => {
  let service: DatahubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatahubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
