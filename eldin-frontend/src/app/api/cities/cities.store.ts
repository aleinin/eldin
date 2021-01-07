import {Injectable} from '@angular/core'
import {action, EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {City} from '../../models/City'
import {map} from 'rxjs/operators'
import {Status} from '../../models/status'

export interface CitiesState extends EntityState<City> {
  status: Status
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'cities', idKey: 'name'})
export class CitiesStore extends EntityStore<CitiesState> {
  constructor() {
    super({status: Status.IDLE})
  }

  @action('Set Loading')
  setLoading() {
    this.update({status: Status.LOADING})
  }

  @action('Set Cities')
  setCities(cities: City[]) {
    this.set(cities)
    this.update({status: Status.SUCCESS})
  }

  @action('Set Failure')
  setFailure() {
    this.update({status: Status.FAILURE})
  }
}

@Injectable({providedIn: 'root'})
export class CitiesQuery extends QueryEntity<CitiesState> {
  constructor(protected store: CitiesStore) {
    super(store)
  }

  selectCities() {
    return this.selectAll().pipe(
      map((cities) => {
        return cities.map((city: City) => ({...city, nation: city.nation.replace('[Capital]', '♔')}))
      })
    )
  }

  selectStatus() {
    return this.select('status')
  }
}
