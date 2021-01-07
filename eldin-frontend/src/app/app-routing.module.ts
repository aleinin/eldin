import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {PeopleComponent} from './components/people/people.component'
import {CityComponent} from './components/city/city.component'
import {GoodsComponent} from './components/goods/goods.component'
import {BuildingsComponent} from './components/buildings/buildings.component'
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component'
import {PeopleDetailComponent} from './components/people-detail/people-detail.component'
import {CityDetailComponent} from './components/city-detail/city-detail.component'
import {GoodsDetailComponent} from './components/goods-detail/goods-detail.component'
import {BuildingsDetailComponent} from './components/buildings-detail/buildings-detail.component'
import {NationsComponent} from './components/nations/nations.component'
import {NationsDetailComponent} from './components/nations-detail/nations-detail.component'
import {CommentComponent} from './components/comment/comment.component'

const routes: Routes = [
  {path: '', redirectTo: 'people', pathMatch: 'full'},
  {path: 'people', component: PeopleComponent},
  {path: 'people/:id', component: PeopleDetailComponent},
  {path: 'cities', component: CityComponent},
  {path: 'cities/:id', component: CityDetailComponent},
  {path: 'goods', component: GoodsComponent},
  {path: 'goods/:id', component: GoodsDetailComponent},
  {path: 'buildings', component: BuildingsComponent},
  {path: 'buildings/:id', component: BuildingsDetailComponent},
  {path: 'nations', component: NationsComponent},
  {path: 'nations/:id', component: NationsDetailComponent},
  {path: 'comments', component: CommentComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}
