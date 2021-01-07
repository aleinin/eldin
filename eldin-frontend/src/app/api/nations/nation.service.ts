import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from '../api-config'
import {Nation, NationDetail} from '../../models/Nation'
import {NationStore} from './nation.store'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private http: HttpClient,
              private nationStore: NationStore) {
  }

  getNations(): Observable<Nation[]> {
    this.nationStore.setLoading()
    return this.http.get<Nation[]>(`${baseUrl}/nations`).pipe(
      tap((nations) => this.nationStore.setNations(nations),
        () => this.nationStore.setFailure())
    )
  }

  getNation(nation: string): Observable<NationDetail> {
    return this.http.get<NationDetail>(`${baseUrl}/nations/${nation}`)
  }
}
