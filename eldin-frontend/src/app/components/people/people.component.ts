import {Column} from '../../models/Column'
import {PeopleService} from '../../api/people/people.service'
import {Person} from '../../models/Person'
import {menuSubject} from '../left-menu/menu.state'
import {PeopleQuery} from '../../api/people/people.store'
import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Observable} from 'rxjs'
import {filter, switchMap} from 'rxjs/operators'
import {Status} from '../../models/status'

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  items: MenuItem[]
  people: Observable<Person[]>
  cols: Column[] = [
    {field: 'userName', header: 'Person', centered: false, link: 'people', flex: 3},
    {field: 'rank', header: 'Rank', centered: false, flex: 1},
    {field: 'total', header: 'Total Tiles', centered: true, flex: 1},
    {field: 'wild', header: 'Wild Tiles', centered: true, flex: 1},
    {field: 'city', header: 'City Tiles', centered: true, flex: 1},
    {field: 'nether', header: 'Nether Tiles', centered: true, flex: 1},
    {field: 'end', header: 'End Tiles', centered: true, flex: 1}
  ]
  Status = Status

  constructor(private service: PeopleService,
              protected peopleQuery: PeopleQuery) {
  }

  ngOnInit() {
    this.items = [
      {label: 'People'}
    ]
    this.people = this.peopleQuery.selectAll()
    this.peopleQuery.selectAll().pipe(
      filter((people) => people.length === 0),
      switchMap(() => this.service.getPeople())
    ).subscribe()
    menuSubject.next('people')
  }

}
