import { TestBed } from '@angular/core/testing';

import { MessageHandlerService } from './message-handler.service';

describe('MessageHandlerService', () => {
  let service: MessageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
