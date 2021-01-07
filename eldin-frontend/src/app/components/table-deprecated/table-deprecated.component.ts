import {Component, Input, OnInit} from '@angular/core'
import {TimeService} from '../../api/time/time.service'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
import {SortEvent} from 'primeng/api'

@Component({
  selector: 'app-table',
  templateUrl: './table-deprecated.component.html',
  styleUrls: ['./table-deprecated.component.css']
})
export class TableDeprecatedComponent implements OnInit {
  @Input() cols: any[]
  @Input() values: any[]
  @Input() moreInfo = true
  @Input() color = 'none'
  @Input() title
  @Input()
  lastUpdated

  constructor(private timeService: TimeService,
              private router: Router) {
  }

  ngOnInit() {
    this.lastUpdated = this.timeService.getTime().pipe(
      map(timeObj => this.getMinutesAgo(timeObj.timestamp))
    )
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

  route(param: string, source: string) {
    this.router.navigate([`/${source}`, param])
  }

  customSort(event: SortEvent) {
    const sortType = event.field
    if (sortType === 'nation') {
      // return nationSort(event)
    } else if (sortType === 'citySize') {
      // return cityRankSort(event)
    } else if (sortType === 'rank') {
      // return playerRankSort(event)
    } else {
      // return defaultSort(event)
    }
  }
}
