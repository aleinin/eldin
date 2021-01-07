import {Built} from './sub-models/built'

export interface Building {
  building: string
  tiered: 'Yes' | 'No'
  foundIn: number
}

export interface BuildingDetail {
  info: Building
  built: Built
}
