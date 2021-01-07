import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {PeopleComponent} from './components/people/people.component'
import {CityComponent} from './components/city/city.component'
import {GoodsComponent} from './components/goods/goods.component'
import {BuildingsComponent} from './components/buildings/buildings.component'
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component'
import {PeopleDetailComponent} from './components/people-detail/people-detail.component'
import {CityDetailComponent} from './components/city-detail/city-detail.component'
import {GoodsDetailComponent} from './components/goods-detail/goods-detail.component'
import {BuildingsDetailComponent} from './components/buildings-detail/buildings-detail.component'
import {RouterModule} from '@angular/router'
import {adminLteConf} from './admin-lte.conf'
import {LayoutModule} from 'angular-admin-lte'
import {
  BreadcrumbModule,
  ButtonModule,
  CaptchaModule,
  CardModule,
  DropdownModule,
  FieldsetModule,
  InputTextareaModule,
  MultiSelectModule,
  ProgressSpinnerModule
} from 'primeng/primeng'
import {HeaderComponent} from './components/header/header.component'
import {TableModule} from 'primeng/table'
import {HttpClientModule} from '@angular/common/http'
import {LeftMenuComponent} from './components/left-menu/left-menu.component'
import {CommentComponent} from './components/comment/comment.component'
import {NationsComponent} from './components/nations/nations.component'
import {NationsDetailComponent} from './components/nations-detail/nations-detail.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ReactiveFormsModule} from '@angular/forms'
import {TableComponent} from './components/table/table.component'
import {NgxDatatableModule} from '@swimlane/ngx-datatable'
import {ErrorPageComponent} from './components/error-page/error-page.component'

/* TODO
Fixes:
Responiveness

New Featues:
Captcha/Feedback

Data Corrections:
Spawn has AH
WA has two helpers and two helper buildings
Atlantis has two helper buildings
 */
@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    CityComponent,
    GoodsComponent,
    BuildingsComponent,
    PageNotFoundComponent,
    PeopleDetailComponent,
    CityDetailComponent,
    GoodsDetailComponent,
    BuildingsDetailComponent,
    HeaderComponent,
    LeftMenuComponent,
    CommentComponent,
    NationsComponent,
    NationsDetailComponent,
    TableComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LayoutModule.forRoot(adminLteConf),
    BreadcrumbModule,
    TableModule,
    CardModule,
    HttpClientModule,
    ButtonModule,
    ProgressSpinnerModule,
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextareaModule,
    FieldsetModule,
    CaptchaModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
