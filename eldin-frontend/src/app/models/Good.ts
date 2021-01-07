import {Sells} from './sub-models/sells'

export interface Good {
  name: string
  sell: number
  buy: number
  boostable: boolean
  t1: null | number
  t2: null | number | string
  t3: null | number
  boostBuilding: string
  tradedIn: number
}

export interface GoodDetail {
  info: Good
  sells: Sells[]
}
