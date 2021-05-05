export interface IActor {
  id: number
  type: ActorType
  firstName: string
  middleName?: string | null
  lastName: string
}

export class Actor implements IActor {
  readonly id: number
  type: ActorType
  firstName: string
  middleName?: string | null
  lastName: string

  constructor(init: IActor) {
    Object.assign(this, init)
  }
}

export enum ActorType {
  Owner,
  Tenant
}