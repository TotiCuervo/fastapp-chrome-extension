import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import { User } from '../user'
import Experience from './experience'

export default interface ExperienceUpdate extends Insert<Omit<Experience, 'company' | 'month'>> {
    id: Experience['id']
    userId: User['id']
    portfolios?: Portfolio['id'][]
    company: string
    startMonth: number
    startYear: number
    endMonth?: number
    endYear?: number
}
