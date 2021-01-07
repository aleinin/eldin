import {Component, Input, OnInit} from '@angular/core'
import {Status} from '../../models/status'

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  @Input() status
  Status = Status

  constructor() {
  }

  ngOnInit() {
  }

}
