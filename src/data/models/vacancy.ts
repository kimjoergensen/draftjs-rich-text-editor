import { IActor } from './actor'
import { IUnit, Unit } from './unit'

export interface IVacancy {
  id: number
  unit: IUnit
  actors: IActor[]
}

export class Vacancy implements IVacancy {
  id: number
  unit: Unit
  actors: IActor[]

  constructor(init: IVacancy) {
    Object.assign(this, init)
  }
}