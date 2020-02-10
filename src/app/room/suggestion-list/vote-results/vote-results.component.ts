import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tsun-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.css']
})
export class VoteResultsComponent implements OnInit {
  @Input() calculatedVotes: any;
  displayedColumns: string[] = ['suggestion','count'];
  constructor() { }

  ngOnInit() {
  }

}
