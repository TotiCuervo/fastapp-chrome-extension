import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import { User } from '../user'
import Skill from './skill'

interface SkillInsert {
    userId: User['id']
    skillSets: Skill['id'][]
    portfolios?: Portfolio['id'][]
}

export default SkillInsert
