import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(readonly http: HttpClient) { }

  GetRooms(groupId: number): Observable<Array<RoomListModel>> {
    return of([
      { id: 1, name: 'Test1' },
      { id: 2, name: 'Test2' },
      { id: 3, name: 'Test3' },
      { id: 4, name: 'Test4' },
      { id: 5, name: 'Test5' },
      { id: 6, name: 'Test6' },
      { id: 7, name: 'Test7' }
    ]);

    return this.http.get<Array<RoomListModel>>('/api/groups', {
      params: {
        groupId: groupId.toString()
      }
    });
  }
}


export class RoomListModel {
  public id: number;
  public name: string;
}
