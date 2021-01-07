import {Component, OnInit} from '@angular/core'
import {MenuItem} from 'primeng/api'
import {Observable} from 'rxjs'
import {Column} from '../../models/Column'
import {ActivatedRoute} from '@angular/router'
import {GoodsService} from '../../api/goods/goods.service'
import {GoodDetail} from '../../models/Good'
import {menuSubject} from '../left-menu/menu.state'

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.css']
})
export class GoodsDetailComponent implements OnInit {
  breadCrumb: MenuItem[]
  title: string
  goods$: Observable<GoodDetail>
  cols: Column[] = [
    {field: 'cityName', header: 'City', centered: false, link: 'cities', flex: 1},
    {field: 'buy', header: 'Buy', centered: true, flex: 1},
    {field: 'sell', header: 'Sell', centered: true, flex: 1},
    {field: 'tier', header: 'Boost Tier', centered: true, flex: 1}
  ]

  constructor(private route: ActivatedRoute,
              private goodsService: GoodsService) {
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id')
    this.breadCrumb = [
      {label: 'Good', routerLink: '/goods'},
      {label: 'Details'}
    ]
    this.goods$ = this.goodsService.getGood(this.title)
    menuSubject.next('goods')
  }

  toTitleCase(title: string) {
    let newTitleSplit = title.split(' ')
    newTitleSplit = newTitleSplit.map(word => {
      return word[0].toUpperCase() + word.slice(1)
    })
    const newTitle = newTitleSplit.toString().replace(',', ' ')
    return newTitle
  }

}
