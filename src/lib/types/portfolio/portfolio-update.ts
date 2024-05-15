import Skill from '../skills/skill'
import Update from '../update'
import Portfolio from './portfolio'

type PortfolioUpdate = Update<Omit<Portfolio, 'skills'>> & {
    id: Portfolio['id']
    name?: string
    skills?: Skill['id'][]
    experiences: []
}

export default PortfolioUpdate
