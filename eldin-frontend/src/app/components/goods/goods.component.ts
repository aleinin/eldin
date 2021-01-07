import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Column} from '../../models/Column'
import {Good} from '../../models/Good'
import {Observable} from 'rxjs'
import {GoodsService} from '../../api/goods/goods.service'
import {filter, switchMap} from 'rxjs/operators'
import {menuSubject} from '../left-menu/menu.state'
import {GoodsQuery} from '../../api/goods/goods.store'
import {Status} from '../../models/status'

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  items: MenuItem[]
  cols: Column[] = [
    {field: 'name', header: 'Item', centered: false, link: 'goods', flex: 1},
    {field: 'sell', header: 'Sell (Base)', centered: true, flex: 1},
    {field: 'buy', header: 'Buy (Base)', centered: true, flex: 1},
    {field: 'tradedIn', header: 'Traded by', centered: true, flex: 1},
    {field: 't1', header: 'Sell (T1)', centered: true, flex: 1},
    {field: 't2', header: 'Sell (T2)', centered: true, flex: 1},
    {field: 't3', header: 'Sell (T3)', centered: true, flex: 1}
  ]
  goods: Observable<Good[]>
  Status = Status

  constructor(private goodsService: GoodsService,
              protected goodsQuery: GoodsQuery) {
  }

  ngOnInit() {
    this.items = [
      {label: 'Market Good'}
    ]
    this.goods = this.goodsQuery.selectGoods()
    this.goodsQuery.selectAll().pipe(
      filter((goods) => goods.length === 0),
      switchMap(() => this.goodsService.getGoods())
    ).subscribe()
    menuSubject.next('goods')
  }
}
