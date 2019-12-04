import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(readonly http: HttpClient) { }

  GetGroups(all: boolean): Observable<Array<GroupListModel>> {
    return of([
      { name: 'Test1' },
      { name: 'Test2' },
      { name: 'Test3' },
      { name: 'Test4' },
      { name: 'Test5' },
      { name: 'Test6' },
      { name: 'Test7' }
    ]);

    return this.http.get<Array<GroupListModel>>('/api/groups', {
      params: {
        all: all.toString()
      }
    });
  }
}

export class GroupListModel {
  public name: string;
}