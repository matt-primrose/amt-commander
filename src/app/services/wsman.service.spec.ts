import { TestBed } from '@angular/core/testing';

import { WsmanService } from './wsman.service';

describe('WsmanService', () => {
  let service: WsmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
