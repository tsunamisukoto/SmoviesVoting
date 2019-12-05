import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GroupService, GroupListModel } from './group.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupEditModalComponent } from './group-edit-modal/group-edit-modal.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent implements OnInit {

  groups: Array<GroupListModel>;
  loading = false;
  constructor(readonly service: GroupService, readonly cdr: ChangeDetectorRef, readonly dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.loading = true;
    this.service.getGroups(false).then(groups => {
      this.loading = false;
      this.groups = groups;
      this.cdr.markForCheck();
    });
  }

  openEditModal(id: number): void {
    const dialogRef = this.dialog.open(GroupEditModalComponent, {
      width: '250px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadGroups();
    });
  }
}
