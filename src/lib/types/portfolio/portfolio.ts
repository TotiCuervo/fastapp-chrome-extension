import Education from '../education/education'
import Experience from '../experience/experience'
import Skill from '../skills/skill'
import { User } from '../user'

export default interface Portfolio {
    id: number
    name: string
    description: string
    email: string
    phone: string
    education: Education[]
    skills: Skill[]
    experience: Experience[]
    user: User
}
