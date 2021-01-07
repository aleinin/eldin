import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from '../api-config'
import {Good, GoodDetail} from '../../models/Good'
import {GoodsStore} from './goods.store'
import {tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private http: HttpClient,
              private goodsStore: GoodsStore) {
  }

  getGoods(): Observable<Good[]> {
    this.goodsStore.setLoading()
    return this.http.get<Good[]>(`${baseUrl}/goods`).pipe(
      tap((goods) => this.goodsStore.setGoods(goods),
        () => this.goodsStore.setFailure())
    )
  }

  getGood(good: string): Observable<GoodDetail> {
    return this.http.get<GoodDetail>(`${baseUrl}/goods/${good}`)
  }
}
