import { TestBed } from '@angular/core/testing';

import { NewsURLService } from './news-url.service';

describe('NewsURLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsURLService = TestBed.get(NewsURLService);
    expect(service).toBeTruthy();
  });
});
