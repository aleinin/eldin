import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {ActivatedRoute} from '@angular/router'
import {PeopleService} from '../../api/people/people.service'
import {Observable} from 'rxjs'
import {Column} from '../../models/Column'
import {PersonDetail} from '../../models/Person'
import {menuSubject} from '../left-menu/menu.state'

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {
  breadCrumb: MenuItem[]
  title: string
  person$: Observable<PersonDetail>
  cols: Column[] = [
    {field: 'cityName', header: 'City', centered: false, link: 'cities', flex: 1},
    {field: 'tiles', header: 'Tiles', centered: true, flex: 1}
  ]

  constructor(private route: ActivatedRoute,
              private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id')
    this.breadCrumb = [
      {label: 'People', routerLink: '/people'},
      {label: 'Details'}
    ]
    this.person$ = this.peopleService.getPerson(this.title)
    menuSubject.next('people')
  }
}
