import {Component, OnInit} from '@angular/core'
import {menuSubject} from '../left-menu/menu.state'
import {Column} from '../../models/Column'
import {MenuItem} from 'primeng/api'
import {ActivatedRoute} from '@angular/router'
import {NationService} from '../../api/nations/nation.service'
import {Observable} from 'rxjs'
import {NationDetail} from '../../models/Nation'

@Component({
  selector: 'app-nations-detail',
  templateUrl: './nations-detail.component.html',
  styleUrls: ['./nations-detail.component.css']
})
export class NationsDetailComponent implements OnInit {
  breadCrumb: MenuItem[]
  title: string
  nation$: Observable<NationDetail>
  buildings: Column[] = [
    {field: 'building', header: 'Building', centered: false, flex: 1}
  ]
  members: Column[] = [
    {field: 'cityName', header: 'City', centered: false, link: 'cities', flex: 1},
    {field: 'citySize', header: 'City Rank', centered: true, flex: 1},
    {field: 'population', header: 'Population', centered: true, flex: 1},
  ]

  constructor(private route: ActivatedRoute,
              private nationService: NationService) {
  }

  ngOnInit() {
    menuSubject.next('nations')
    this.title = this.route.snapshot.paramMap.get('id')
    this.breadCrumb = [
      {label: 'Nations', routerLink: '/nations'},
      {label: 'Details'}
    ]
    this.nation$ = this.nationService.getNation(this.title)
  }

}
