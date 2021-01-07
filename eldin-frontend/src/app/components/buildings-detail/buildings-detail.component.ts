import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Observable} from 'rxjs'
import {Column} from '../../models/Column'
import {ActivatedRoute} from '@angular/router'
import {BuildingsService} from '../../api/buildings/buildings.service'
import {BuildingDetail} from '../../models/Building'
import {menuSubject} from '../left-menu/menu.state'

@Component({
  selector: 'app-buildings-detail',
  templateUrl: './buildings-detail.component.html',
  styleUrls: ['./buildings-detail.component.css']
})
export class BuildingsDetailComponent implements OnInit {
  breadCrumb: MenuItem[]
  title: string
  buildings$: Observable<BuildingDetail>
  tieredCols: Column[] = [
    {field: 'cityName', header: 'City', centered: false, link: 'cities', flex: 1},
    {field: 'tier', header: 'Tier', centered: true, flex: 1},
  ]
  noTierCols: Column[] = [
    {field: 'cityName', header: 'City', centered: false, link: 'cities', flex: 1},
  ]

  constructor(private route: ActivatedRoute,
              private buildingsService: BuildingsService) {
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id')
    this.breadCrumb = [
      {label: 'Good', routerLink: '/goods'},
      {label: 'Details'}
    ]
    this.buildings$ = this.buildingsService.getBuilding(this.title)
    menuSubject.next('buildings')
  }
}
