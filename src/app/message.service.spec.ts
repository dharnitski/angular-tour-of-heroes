import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('should be cleared', () => {
    const service: MessageService = TestBed.get(MessageService);
    service.add('Foo');
    expect(service.messages.length).toEqual(1);
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});
