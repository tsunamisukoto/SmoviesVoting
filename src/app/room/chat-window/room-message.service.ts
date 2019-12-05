import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomMessageService {

  constructor(readonly http: HttpClient) { }

  getMessages = (roomId: number): Promise<RoomChatMessageModel[]> => {
    return this.http.get<RoomChatMessageModel[]>('api/room/message', { params: { roomId: roomId.toString() } })
      .toPromise();
  };
  sendMessage = (roomId: number, message: string): Promise<RoomChatMessageModel[]> => {
    return this.http.post<RoomChatMessageModel[]>('api/room/message', {
      roomId,
      message
    }).toPromise();
  };
}

export class RoomChatMessageModel {
  public id: number;
  public name: string;
};