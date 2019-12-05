import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(readonly http: HttpClient) { }

  getSuggestions = (roomId: number): Promise<SuggestionModel[]> => {
    return this.http.get<SuggestionModel[]>('api/suggestion', { params: { roomId: roomId.toString() } })
      .toPromise();
  };

  sendSuggestions = (roomId: number, suggestion: string): Promise<SuggestionModel[]> => {
    return this.http.post<SuggestionModel[]>('api/suggestion', {
      roomId,
      suggestion
    }).toPromise();
  };

  getSessions = (roomId: number): Promise<SessionModel[]> => {
    return this.http.get<SessionModel[]>('api/voteSession', { params: { roomId: roomId.toString() } })
      .toPromise();
  }
  addSession = (roomId: number): Promise<SessionModel> => {
    return this.http.post<SessionModel[]>('api/voteSession', { roomId })
      .toPromise();
  }
}

export class SuggestionModel {

}

export class SessionModel {

}