import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit {

  @Input() public address!: any;
  @Input() public balance!: number;
  @Input() public type!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
