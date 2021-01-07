import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Column} from '../../models/Column'
import {Observable} from 'rxjs'
import {CitiesService} from '../../api/cities/cities.service'
import {filter, switchMap} from 'rxjs/operators'
import {City} from '../../models/City'
import {menuSubject} from '../left-menu/menu.state'
import {CitiesQuery} from '../../api/cities/cities.store'
import {Status} from '../../models/status'

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  items: MenuItem[]
  cols: Column[]
  cities: Observable<City[]>
  Status = Status

  constructor(private citiesService: CitiesService,
              protected citiesQuery: CitiesQuery) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Cities'}
    ]
    menuSubject.next('cities')
    this.cols = [
      {field: 'name', header: 'City', centered: false, link: 'cities', flex: 1},
      {field: 'owner', header: 'Owner', centered: false, link: 'people', flex: 1},
      {field: 'citySize', header: 'City Rank', centered: false, flex: 1},
      {field: 'totalTiles', header: 'Total Tiles', centered: true, flex: 1},
      {field: 'population', header: 'Population', centered: true, flex: 1},
      {field: 'nation', header: 'Nation', centered: true, link: 'nations', flex: 1},
      {field: 'hasMarket', header: 'Has Market', centered: true, flex: 1}
    ]
    this.cities = this.citiesQuery.selectCities()
    this.citiesQuery.selectAll().pipe(
      filter((cities) => cities.length === 0),
      switchMap(() => this.citiesService.getCities())
    ).subscribe()
  }
}
