import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core'
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable'
import {filter, map, switchMap} from 'rxjs/operators'
import {TimeService} from '../../api/time/time.service'
import {Router} from '@angular/router'
import {playerRankSort} from '../../util/playerRankSort'
import {defaultSort} from '../../util/defaultSort'
import {nationSort} from '../../util/nationSort'
import {cityRankSort} from '../../util/cityRankSort'
import {TimeQuery} from '../../api/time/time.store'
import {Status} from '../../models/status'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {
  @Input() cols: any[]
  @Input() values: any[]
  @Input() moreInfo = true
  @Input() color = 'none'
  @Input() title
  temp = []
  ColumnMode = ColumnMode
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent
  lastUpdated
  Status = Status

  constructor(private timeService: TimeService,
              private timeQuery: TimeQuery,
              private router: Router) {
  }

  ngOnInit(): void {
    this.lastUpdated = this.timeQuery.selectTime().pipe(
      map((time) => this.getMinutesAgo(time))
    )
    this.timeQuery.selectTime().pipe(
      filter((time) => time == null),
      switchMap(() => this.timeService.getTime())
    ).subscribe()
  }

  ngOnChanges() {
    this.temp = this.values
  }

  route(param: string, source: string) {
    this.router.navigate([`/${source}`, param])
  }

  updateFilter(event) {
    const filterValue = event.target.value.toLowerCase()
    this.values = this.temp.filter(row => {
      return !filterValue ||
        this.checkContains(row, filterValue)
    })
    this.table.offset = 0
  }

  checkContains(row: any[], filterValue: string) {
    return Object.values(row).some((value) => {
      if (typeof value !== 'string') {
        value = value.toString()
      }
      return value.toLowerCase().indexOf(filterValue) !== -1
    })
  }

  customSort(propA, propB, rowA) {
    let fieldName = ''
    for (const [keyA, valueA] of Object.entries(rowA)) {
      if (valueA === propA) {
        fieldName = keyA
      }
    }
    if (fieldName === 'nation') {
      return nationSort(propA, propB)
    } else if (fieldName === 'citySize') {
      return cityRankSort(propA, propB)
    } else if (fieldName === 'rank') {
      return playerRankSort(propA, propB)
    } else {
      return defaultSort(propA, propB)
    }
  }

  getMinutesAgo(then: number): string {
    const difference = Math.floor(Date.now() / 1000) - then
    const minutesAgo = Math.floor(difference / 60)
    return this.formatUpdated(minutesAgo)
  }

  formatUpdated(minutesAgo: number) {
    if (minutesAgo === 0) {
      return 'Data last updated just now'
    }
    if (minutesAgo < 60) {
      return `Data last updated ${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`
    }
    const hoursAgo = Math.floor(minutesAgo / 60)
    if (hoursAgo < 24) {
      return `Data last updated ${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`
    }
    const daysAgo = Math.floor(minutesAgo / 1440)
    return `Data last updated ${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
  }
}
