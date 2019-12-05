import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService, RoomListModel } from './room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomEditModalComponent } from './room-edit-modal/room-edit-modal.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomListComponent implements OnInit {

  rooms: Array<RoomListModel>;
  loading = false;
  groupId: number;

  constructor(readonly service: RoomService,
              readonly activatedRoute: ActivatedRoute,
              readonly cdr: ChangeDetectorRef, 
              readonly dialog: MatDialog) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.loadRooms();
    });
  }
  loadRooms(): void {
    this.loading = true;
    this.service.getRooms(this.groupId).then(rooms => {
      this.loading = false;
      this.rooms = rooms;
      this.cdr.markForCheck();
    });
  }
  openEditModal(id: number): void {
    const dialogRef = this.dialog.open(RoomEditModalComponent, {
      width: '250px',
      data: { id, groupId: this.groupId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRooms();
    });
  }
}
