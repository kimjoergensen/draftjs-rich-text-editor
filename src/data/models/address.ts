export interface IAddress {
  id: number
  street: string
  number: number
  postal: string
}

export class Address implements IAddress {
  id: number
  street: string
  number: number
  postal: string

  constructor(init: IAddress) {
    Object.assign(this, init)
  }
}