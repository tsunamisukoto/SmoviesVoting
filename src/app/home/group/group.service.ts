import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(readonly http: HttpClient) { }

  getGroups = (all: boolean): Promise<GroupListModel[]> => {
    return this.http.get<GroupListModel[]>('api/group', { params: { all: all.toString() } })
      .toPromise();
  }

  getGroup(groupId: number): Promise<DetailedGroupModel> {
    return this.http.get<DetailedGroupModel>(`/api/group/${groupId}`).toPromise();
  }

  addGroup = (newGroup): Promise<any> => {
    return this.http.post('api/group', newGroup)
      .toPromise();
  }
}

export class GroupListModel {
  public id: number;
  public name: string;
  public shortDescription: string;
}

export class DetailedGroupModel extends GroupListModel {
  public description: string;
}
