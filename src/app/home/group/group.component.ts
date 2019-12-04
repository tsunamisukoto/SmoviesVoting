import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GroupService, GroupListModel } from './group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  groups: Array<GroupListModel>;
  loading = false;
  constructor(readonly service: GroupService) { }
  ngOnInit(): void {
    this.loadGroups();
  }
  loadGroups(): void {
    this.loading = true;
    this.service.GetGroups(false).subscribe(groups => {
      this.loading = false;
      this.groups = groups;
    });
  }
}
