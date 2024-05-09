import { User } from '../user'
import EducationDate from '../misc/DateProfile'
import Timestamp from '../shared/timestamp'

export default interface Education extends Timestamp {
    id: number
    school: string
    degree: string
    startedOn: EducationDate
    endedOn: EducationDate
    fieldOfStudy: string
    gpa?: number
    gpaScale?: number
}
