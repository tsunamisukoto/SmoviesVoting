import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService, DetailedRooomModel } from '../home/room-list/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  roomId: number;
  room: DetailedRooomModel;
  constructor(readonly activatedRoute: ActivatedRoute, readonly roomService: RoomService, readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomId = params['roomId'];
      this.roomService.getRoom(this.roomId).then(room => { 
        
        this.room = room;
        this.cdr.markForCheck();
      });

    });

  }

}
