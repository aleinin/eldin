import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {
  }

  /*
  postFeedback(comments: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${baseUrl}/feedback`, comments)
  }
  */
}
