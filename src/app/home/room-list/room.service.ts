import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(readonly http: HttpClient) { }

  getRooms(groupId: number): Promise<Array<RoomListModel>> {
    return this.http.get<Array<RoomListModel>>('/api/room', {
      params: {
        groupId: groupId.toString()
      }
    }).toPromise();
  }
  getRoom(roomId: number): Promise<DetailedRooomModel> {
    return this.http.get<DetailedRooomModel>(`/api/room/${roomId}`).toPromise();
  }

  addRoom = (groupId, newRoom): Promise<any> => {
    return this.http.post(`api/room/${groupId}`, newRoom)
      .toPromise();
  }
}


export class RoomListModel {
  public id: number;
  public name: string;
}

export class DetailedRooomModel
{
  public id: number;
  public name: string;
  public description: string;
}
