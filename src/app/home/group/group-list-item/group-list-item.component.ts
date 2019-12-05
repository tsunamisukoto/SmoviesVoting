import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { GroupListModel } from '../group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListItemComponent implements OnInit {

  @Input() group: GroupListModel;
  constructor(readonly route: Router) { }

  ngOnInit(): void {
  }

  enterGroup(): void {
    this.route.navigate(['/group', this.group.id]);
  }
}
