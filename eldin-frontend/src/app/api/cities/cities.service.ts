import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from '../api-config'
import {City, CityDetail} from '../../models/City'
import {tap} from 'rxjs/operators'
import {CitiesStore} from './cities.store'

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient,
              private citiesStore: CitiesStore) {
  }

  getCities(): Observable<City[]> {
    this.citiesStore.setLoading()
    return this.http.get<City[]>(`${baseUrl}/cities`).pipe(
      tap((cities) => this.citiesStore.setCities(cities),
        () => this.citiesStore.setFailure())
    )
  }

  getCity(city: string): Observable<CityDetail> {
    return this.http.get<CityDetail>(`${baseUrl}/cities/${city}`)
  }
}
