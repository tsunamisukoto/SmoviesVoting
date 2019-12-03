import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomListItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
