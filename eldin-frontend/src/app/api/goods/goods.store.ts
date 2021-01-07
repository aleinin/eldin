import {Injectable} from '@angular/core'
import {action, EntityState, EntityStore, QueryEntity, StoreConfig} from '@datorama/akita'
import {Good} from '../../models/Good'
import {map} from 'rxjs/operators'
import {Status} from '../../models/status'

export interface GoodsState extends EntityState<Good> {
  status: Status
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'goods', idKey: 'name'})
export class GoodsStore extends EntityStore<GoodsState> {
  constructor() {
    super({status: Status.IDLE})
  }

  @action('Set Loading')
  setLoading() {
    this.update({status: Status.LOADING})
  }

  @action('Set Goods')
  setGoods(goods: Good[]) {
    this.set(goods)
    this.update({status: Status.SUCCESS})
  }

  @action('Set Failure')
  setFailure() {
    this.update({status: Status.FAILURE})
  }
}

@Injectable({providedIn: 'root'})
export class GoodsQuery extends QueryEntity<GoodsState> {
  constructor(protected store: GoodsStore) {
    super(store)
  }

  selectGoods() {
    return this.selectAll().pipe(
      map((goods) => goods.map((good) => good.boostable ? good : ({...good, t2: `(Not Boostable)`})))
    )
  }

  selectStatus() {
    return this.select('status')
  }
}
