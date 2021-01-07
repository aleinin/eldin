import {Member} from './sub-models/member'

export interface Nation {
  nation: string,
  owner: string,
  member: number
}

export interface NationDetail {
  info: Nation
  members: Member[]
  buildings: string[]
}
