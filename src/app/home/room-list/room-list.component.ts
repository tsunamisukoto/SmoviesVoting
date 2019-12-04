import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { RoomService, RoomListModel } from './room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomListComponent implements OnInit {

  rooms: Array<RoomListModel>;
  loading = false;
  @Input() roomId: number;

  constructor(readonly service: RoomService) { }
  ngOnInit(): void {
    this.loadRooms();
  }
  loadRooms(): void {
    this.loading = true;
    this.service.GetRooms(this.roomId).subscribe(rooms => {
      this.loading = false;
      this.rooms = rooms;
    });
  }

}
