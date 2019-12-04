import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { GroupListModel } from '../group.service';

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListItemComponent implements OnInit {

  @Input() group: GroupListModel;
  constructor() { }

  ngOnInit(): void {
  }

}
