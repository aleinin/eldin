import {Component, OnInit} from '@angular/core'
import {menuSubject} from '../left-menu/menu.state'
import {MenuItem} from 'primeng/api'
import {Column} from '../../models/Column'
import {Observable} from 'rxjs'
import {Nation} from '../../models/Nation'
import {NationService} from '../../api/nations/nation.service'
import {filter, switchMap} from 'rxjs/operators'
import {NationQuery} from '../../api/nations/nation.store'
import {Status} from '../../models/status'

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrls: ['./nations.component.css']
})
export class NationsComponent implements OnInit {
  Status = Status
  items: MenuItem[]
  cols: Column[]
  nations: Observable<Nation[]>

  constructor(private nationService: NationService,
              protected nationQuery: NationQuery) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Nations'}
    ]
    this.cols = [
      {field: 'nation', header: 'Nation', centered: false, link: 'nations', flex: 1},
      {field: 'capital', header: 'Capital', centered: false, link: 'cities', flex: 1},
      {field: 'owner', header: 'Leader', centered: true, link: 'people', flex: 1},
      {field: 'members', header: 'Members', centered: true, flex: 1},
    ]
    this.nations = this.nationQuery.selectAll()
    this.nationQuery.selectAll().pipe(
      filter((nations) => nations.length === 0),
      switchMap(() => this.nationService.getNations())
    ).subscribe()
    menuSubject.next('nations')
  }
}
