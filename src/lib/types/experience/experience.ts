import Company from '../company/company'
import DateProfile from '../misc/DateProfile'
import Timestamp from '../shared/timestamp'
import ExperienceType from './experience-type'

export default interface Experience extends Timestamp {
    id: number
    company: Company
    position: string
    location: string
    startedOn: DateProfile
    endedOn: Partial<DateProfile>
    description: string
    experienceType: ExperienceType
}
