import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { SuggestionService, SuggestionModel, SessionModel } from './suggestion.service';
import { VoteService } from './vote.service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestionListComponent implements OnInit {

  documents = this.socket.fromEvent<string[]>('documents');
  constructor(readonly service: SuggestionService, readonly cdr: ChangeDetectorRef, readonly voteService: VoteService, readonly socket: Socket) {

  }
  suggestions: Array<SuggestionModel>;
  sessions: Array<SessionModel>;
  selectedSuggestions: Array<SuggestionModel> = [];
  selectedSession: SessionModel;
  formData;
  @Input() roomId: number;
  ngOnInit(): void {
    this.socket.on('reload', () => { this.loadMessages() });
    this.loadMessages();
    this.loadSessions();
  }

  loadMessages(): void {
    this.formData = {};
    this.service.getSuggestions(this.roomId).then(suggestions => {
      this.suggestions = suggestions;
      this.cdr.markForCheck();
    });
  }

  suggestionSelected = (suggestion: SuggestionModel) => {
    if (this.selectedSuggestions.indexOf(suggestion) === -1) {
      this.selectedSuggestions.push(suggestion);

    }

    this.cdr.markForCheck();
  };

  sendVotes = () => {
    this.voteService.sendVotes(this.selectedSession.id, this.selectedSuggestions.map(s => s.id)).then(() => {
      this.selectedSuggestions = [];
      this.cdr.markForCheck();
    });
  };

  calculatedVotes: any;
  calculateVotes = () => {
    this.service.calculateVotes(this.selectedSession.id).then(val => {
      this.calculatedVotes = val;
      this.cdr.markForCheck();
    });
  }

  loadSessions(): void {
    this.service.getSessions(this.roomId).then(sessions => {
      this.sessions = sessions;
      this.cdr.markForCheck();
    });
  }

  onEnter(): void {
    this.service.sendSuggestions(this.roomId, this.formData.suggestion).then(() => {
      this.loadMessages();
    });
  }
  addSession(): void {
    this.service.addSession(this.roomId).then((session) => {
      this.sessions.push(session);
      this.cdr.markForCheck();
    });
  }


}
