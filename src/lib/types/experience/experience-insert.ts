import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import { User } from '../user'
import Experience from './experience'

interface ExperienceInsert extends Insert<Omit<Experience, 'company' | 'month'>> {
    userId: User['id']
    portfolios?: Portfolio['id'][]
    company: string
    startMonth: number
    startYear: number
    endMonth?: number
    endYear?: number
}

export default ExperienceInsert
