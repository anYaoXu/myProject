import { TestBed } from '@angular/core/testing';

import { HttpInterceptor.Service.TsService } from './http-interceptor.service';

describe('HttpInterceptor.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptor.Service.TsService = TestBed.get(HttpInterceptor.Service.TsService);
    expect(service).toBeTruthy();
  });
});
