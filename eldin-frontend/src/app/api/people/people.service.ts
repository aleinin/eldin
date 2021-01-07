import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from '../api-config'
import {Person, PersonDetail} from '../../models/Person'
import {tap} from 'rxjs/operators'
import {PeopleStore} from './people.store'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient,
              private peopleStore: PeopleStore) {
  }

  getPeople(): Observable<Person[]> {
    this.peopleStore.setLoading()
    return this.http.get<Person[]>(`${baseUrl}/people`).pipe(
      tap((people) => this.peopleStore.setPeople(people),
        () => this.peopleStore.setFailure())
    )
  }

  getPerson(username: string): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(`${baseUrl}/people/${username}`)
  }
}
