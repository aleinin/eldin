import {Component, OnInit} from '@angular/core'
import {menuSubject} from '../left-menu/menu.state'
import {MenuItem} from 'primeng/api'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  items: MenuItem[]
  categories
  pages
  form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      pages: [''],
      comments: ['', Validators.required],
      security: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.categories = [
      {label: 'Bad Data', value: 'data'},
      {label: 'Bug', value: 'bug'},
      {label: 'Look/Feel', value: 'look-feel'},
      {label: 'Suggestion', value: 'suggestion'},
      {label: 'Other', value: 'other'}
    ]
    this.pages = [
      {label: 'People', value: 'people'},
      {label: 'People Details', value: 'people-details'},
      {label: 'Cities', value: 'cities'},
      {label: 'City Details', value: 'city-details'},
      {label: 'Goods', value: 'goods'},
      {label: 'Good Details', value: 'good-details'},
      {label: 'Buildings', value: 'buildings'},
      {label: 'Building Details', value: 'building-details'},
      {label: 'Nations', value: 'nations'},
      {label: 'Nation Details', value: 'nation-details'},
    ]
    this.items = [
      {label: 'Comments'}
    ]
    menuSubject.next('')
  }

  showResponse(event: any) {
    console.log(event)
  }

}
