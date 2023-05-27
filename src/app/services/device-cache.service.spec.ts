import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DeviceCacheService } from './device-cache.service';

describe('DeviceCacheService', () => {
  let service: DeviceCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DeviceCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
