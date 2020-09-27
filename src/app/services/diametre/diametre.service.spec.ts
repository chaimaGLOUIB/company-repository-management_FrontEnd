import { TestBed } from '@angular/core/testing';

import { DiametreService } from './diametre.service';

describe('DiametreService', () => {
  let service: DiametreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiametreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
