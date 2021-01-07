import {Owns} from './sub-models/owns'
import {Lives} from './sub-models/lives'
import {Helps} from './sub-models/helps'
import {Built} from './sub-models/built'

export interface City {
  name: string
  owner: string
  citySize: string
  totalTiles: number
  population: number
  nation: string
  hasMarket: boolean
}

export interface CityDetail {
  info: City
  helps: Helps[]
  owns: Owns[]
  lives: Lives[]
  buildings: Built[]
}
