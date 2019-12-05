import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../group.service';
@Component({
  selector: 'app-group-edit-modal',
  templateUrl: './group-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupEditModalComponent {
  formData: any = {};
  constructor(
    public dialogRef: MatDialogRef<GroupEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private readonly groupService: GroupService) {}

    save(): void {
      this.groupService.addGroup(this.formData).then(() => this.dialogRef.close());
    }
    close(): void {
      this.dialogRef.close();
    }
}
