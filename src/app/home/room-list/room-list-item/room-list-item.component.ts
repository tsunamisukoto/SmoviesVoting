import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RoomListModel } from '../room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomListItemComponent implements OnInit {
  @Input() room: RoomListModel;
  constructor(readonly route: Router) { }

  ngOnInit(): void {
  }
  enterRoom(): void {
    this.route.navigate(['/room', this.room.id]);
  }
}
