import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-edit-modal',
  templateUrl: './room-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomEditModalComponent {
  formData: any = {};
  constructor(
    public dialogRef: MatDialogRef<RoomEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly roomService: RoomService) {}

    save(): void {
      this.roomService.addRoom(this.data.groupId, this.formData).then(() => this.dialogRef.close());
    }
    close(): void {
      this.dialogRef.close();
    }
}

