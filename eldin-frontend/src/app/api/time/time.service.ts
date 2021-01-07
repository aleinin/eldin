import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from '../api-config'
import {Timestamp} from '../../models/Time'
import {TimeStore} from './time.store'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient,
              private readonly timeStore: TimeStore) {
  }

  getTime(): Observable<Timestamp> {
    return this.http.get<Timestamp>(`${baseUrl}/updated`).pipe(
      tap((time) => this.timeStore.setTime(time.timestamp))
    )
  }

}
