/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuggestionService } from './suggestion.service';

describe('Service: Suggestion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestionService]
    });
  });

  it('should ...', inject([SuggestionService], (service: SuggestionService) => {
    expect(service).toBeTruthy();
  }));
});
