import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Column} from '../../models/Column'
import {Building} from '../../models/Building'
import {Observable} from 'rxjs'
import {BuildingsService} from '../../api/buildings/buildings.service'
import {menuSubject} from '../left-menu/menu.state'
import {BuildingsQuery} from '../../api/buildings/buildings.store'
import {filter, switchMap} from 'rxjs/operators'
import {Status} from '../../models/status'

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {
  items: MenuItem[]
  cols: Column[]
  buildings: Observable<Building[]>
  Status = Status

  constructor(private buildingSerivce: BuildingsService,
              protected buildingsQuery: BuildingsQuery) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Building'}
    ]
    this.cols = [
      {field: 'building', header: 'Building', centered: false, link: 'buildings', flex: 1},
      {field: 'tiered', header: 'Tiered?', centered: true, flex: 1},
      {field: 'foundIn', header: 'Found in', centered: true, flex: 1},
    ]
    this.buildings = this.buildingsQuery.selectAll()
    this.buildingsQuery.selectAll().pipe(
      filter((buildings) => buildings.length === 0),
      switchMap(() => this.buildingSerivce.getBuildings())
    ).subscribe()
    menuSubject.next('buildings')
  }
}
