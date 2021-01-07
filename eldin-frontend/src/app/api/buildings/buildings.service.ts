import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from '../api-config'
import {Building, BuildingDetail} from '../../models/Building'
import {BuildingsStore} from './buildings.store'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor(private http: HttpClient,
              private buildingsStore: BuildingsStore) {
  }

  getBuildings(): Observable<Building[]> {
    this.buildingsStore.setLoading()
    return this.http.get<Building[]>(`${baseUrl}/buildings`).pipe(
      tap((buildings) => this.buildingsStore.setBuildings(buildings),
        () => this.buildingsStore.setFailure())
    )
  }

  getBuilding(building: string): Observable<BuildingDetail> {
    return this.http.get<BuildingDetail>(`${baseUrl}/buildings/${building}`)
  }
}
