import { ChangeDetectionStrategy, Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SuggestionModel } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-list-item',
  templateUrl: './suggestion-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggeestionListItemComponent implements OnInit {
  @Input() suggestion: SuggestionModel;
  @Output() suggestionSelected = new EventEmitter<SuggestionModel>();
  constructor() { }

  ngOnInit(): void {
  }
  selectSelection = () => {
    this.suggestionSelected.emit(this.suggestion);
  }
}
