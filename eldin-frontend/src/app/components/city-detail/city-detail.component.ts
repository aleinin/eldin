import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Observable} from 'rxjs'
import {Column} from '../../models/Column'
import {ActivatedRoute} from '@angular/router'
import {CitiesService} from '../../api/cities/cities.service'
import {map} from 'rxjs/operators'
import {CityDetail} from '../../models/City'
import {menuSubject} from '../left-menu/menu.state'

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  breadCrumb: MenuItem[]
  title: string
  cities$: Observable<CityDetail>
  cols: Column[] = [
    {field: 'userName', header: 'Citizen', centered: false, link: 'people', flex: 1},
    {field: 'tiles', header: 'Tiles', centered: true, flex: 1}
  ]

  constructor(private route: ActivatedRoute,
              private citiesService: CitiesService) {
  }

  ngOnInit() {
    menuSubject.next('cities')
    this.title = this.route.snapshot.paramMap.get('id')
    this.breadCrumb = [
      {label: 'Cities', routerLink: '/cities'},
      {label: 'Details'}
    ]
    this.cities$ = this.citiesService.getCity(this.title).pipe(
      map(city => {
        city.info.nation = city.info.nation.replace('[Capital]', '♔')
        return city
      })
    )
  }

  getNumbering(i: number) {
    switch (i) {
      case 0:
        return '1st'
      case 1:
        return '2nd'
      case 2:
        return '3rd'
      case 3:
        return '4th'
      case 4:
        return '5th'
    }
  }
}
