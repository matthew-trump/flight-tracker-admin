import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {


  @Input() routes: any;
  constructor() { }

  ngOnInit() {
  }

}
