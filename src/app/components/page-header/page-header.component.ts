import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  headerTitle: string;

  @Input()
  headerIcon: string;

  constructor() { }

  ngOnInit() {
    this.headerIcon = this.headerIcon ? this.headerIcon : 'fas fa-angle-double-up';
  }

}
