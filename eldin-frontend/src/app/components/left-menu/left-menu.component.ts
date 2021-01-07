import {Component, OnInit} from '@angular/core'
import {menuSubject} from './menu.state'

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  activeTab: string

  constructor() {
  }

  ngOnInit() {
    menuSubject.subscribe(newActiveTab => {
      this.activeTab = newActiveTab
    })
  }

}
