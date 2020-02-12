import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DetailedGroupModel, GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group: DetailedGroupModel;
  groupId: number;
  constructor(readonly service: GroupService, readonly cdr: ChangeDetectorRef, readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.groupId = params.groupId;
      this.service.getGroup(this.groupId).then(group => {
        this.group = group;
        this.cdr.markForCheck();
      });
    });
  }

}
