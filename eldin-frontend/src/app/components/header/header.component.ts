import {Component, Input, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() items: MenuItem[]
  @Input() title: string
  home: MenuItem

  constructor() {
  }

  ngOnInit() {
    this.home = {icon: 'pi pi-home', routerLink: '/people'}
  }

}
