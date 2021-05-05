import { IAddress } from './address'

export interface IUnit {
  id: number
  address: IAddress
}

export class Unit implements IUnit {
  readonly id: number
  address: IAddress
  some: number = Math.random()

  constructor(init: IUnit) {
    Object.assign(this, init)
    // this.some = Math.random()
  }
}