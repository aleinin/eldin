import {Injectable} from '@angular/core'
import {action, EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Nation} from '../../models/Nation'
import {Status} from '../../models/status'

export interface NationState extends EntityState<Nation> {
  status: Status
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'nations', idKey: 'nation'})
export class NationStore extends EntityStore<NationState> {
  constructor() {
    super({status: Status.IDLE})
  }

  @action('Set Loading')
  setLoading() {
    this.update({status: Status.LOADING})
  }

  @action('Set Nations')
  setNations(nations: Nation[]) {
    this.set(nations)
    this.update({status: Status.SUCCESS})
  }

  @action('Set Failure')
  setFailure() {
    this.update({status: Status.FAILURE})
  }
}

@Injectable({providedIn: 'root'})
export class NationQuery extends QueryEntity<NationState> {
  constructor(protected store: NationStore) {
    super(store)
  }

  selectStatus() {
    return this.select('status')
  }
}
