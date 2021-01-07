import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private http: HttpClient) {
  }
}
