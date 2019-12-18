import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

constructor(readonly http: HttpClient) { }
sendVotes = (voteSessionId: number, suggestionIds: number[]): Promise<any> => {
  return this.http.post<any>('api/suggestionVote', {
    voteSessionId,
    suggestionIds
  }).toPromise();
};
}
