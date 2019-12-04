import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  id: number;
  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
  }

}
