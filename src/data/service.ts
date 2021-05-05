import datasource from './datasource.json'
import { Vacancy } from './models/vacancy'

export class VacancyService {
  public static async get(id: number): Promise<Vacancy> {
    const vacancy = datasource.vacancies.find(vacancy => vacancy.id === id)
    if (!vacancy) throw new Error(`could not find a vacancy for id ${id}`)
    return new Vacancy(vacancy)
  }
}