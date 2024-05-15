import Education from '../../lib/types/education/education'
import Experience from '../../lib/types/experience/experience'

export default interface TotalData {
    type: 'education' | 'experience'
    object: Education | Experience
}
