import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import { User } from '../user'
import Education from './education'

interface EducationUpdate extends Insert<Education> {
    id: Education['id']
    userId: User['id']
    portfolios?: Portfolio['id'][]
    startMonth: number
    startYear: number
    endMonth: number
    endYear: number
}

export default EducationUpdate
