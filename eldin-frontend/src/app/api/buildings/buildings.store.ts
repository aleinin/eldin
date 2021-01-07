import {Injectable} from '@angular/core'
import {action, EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Building} from '../../models/Building'
import {Status} from '../../models/status'

export interface BuildingsState extends EntityState<Building> {
  status: Status
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'buildings', idKey: 'building'})
export class BuildingsStore extends EntityStore<BuildingsState> {
  constructor() {
    super({status: Status.IDLE})
  }

  @action('Set Loading')
  setLoading() {
    this.update({status: Status.LOADING})
  }

  @action('Set Buildings')
  setBuildings(buildings: Building[]) {
    this.set(buildings)
    this.update({status: Status.SUCCESS})
  }

  @action('Set Failure')
  setFailure() {
    this.update({status: Status.FAILURE})
  }
}

@Injectable({providedIn: 'root'})
export class BuildingsQuery extends QueryEntity<BuildingsState> {
  constructor(protected store: BuildingsStore) {
    super(store)
  }

  selectStatus() {
    return this.select('status')
  }
}

