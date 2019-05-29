import { TestBed } from '@angular/core/testing';

import { ActivateGuardService } from './activate-guard.service';

describe('ActivateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivateGuardService = TestBed.get(ActivateGuardService);
    expect(service).toBeTruthy();
  });
});
