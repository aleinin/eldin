import {Injectable} from '@angular/core'
import {action, Query, Store, StoreConfig} from '@datorama/akita'

export interface TimeState extends Store {
  timestamp: number
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'time'})
export class TimeStore extends Store<TimeState> {
  constructor() {
    super({timestamp: undefined})
  }

  @action('Set Time')
  setTime(time: number) {
    this.update({timestamp: time})
  }
}

@Injectable({providedIn: 'root'})
export class TimeQuery extends Query<TimeState> {
  constructor(protected store: TimeStore) {
    super(store)
  }

  selectTime() {
    return this.select('timestamp')
  }
}
