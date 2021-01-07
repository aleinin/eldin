import {Injectable} from '@angular/core'
import {action, EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Person} from '../../models/Person'
import {Status} from '../../models/status'

export interface PeopleState extends EntityState<Person> {
  status: Status
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'people', idKey: 'userName'})
export class PeopleStore extends EntityStore<PeopleState> {
  constructor() {
    super()
  }

  @action('Set Loading')
  setLoading() {
    this.update({status: Status.LOADING})
  }

  @action('Set People')
  setPeople(people: Person[]) {
    this.set(people)
    this.update({status: Status.SUCCESS})
  }

  @action('Set Failure')
  setFailure() {
    this.update({status: Status.FAILURE})
  }
}

@Injectable({providedIn: 'root'})
export class PeopleQuery extends QueryEntity<PeopleState> {
  constructor(protected store: PeopleStore) {
    super(store)
  }

  selectStatus() {
    return this.select('status')
  }
}

