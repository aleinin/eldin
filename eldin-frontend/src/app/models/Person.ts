import {Owns} from './sub-models/owns'
import {Lives} from './sub-models/lives'
import {Helps} from './sub-models/helps'

export interface Person {
  userName: string
  rank: string
  total: number
  wild: number
  city: number
  nether: number
  end: number
}

export interface PersonDetail {
  info: Person
  helps: Helps[]
  owns: Owns[]
  lives: Lives[]
}
