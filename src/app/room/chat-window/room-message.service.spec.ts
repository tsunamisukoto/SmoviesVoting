/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomMessageService } from './room-message.service';

describe('Service: RoomMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomMessageService]
    });
  });

  it('should ...', inject([RoomMessageService], (service: RoomMessageService) => {
    expect(service).toBeTruthy();
  }));
});
