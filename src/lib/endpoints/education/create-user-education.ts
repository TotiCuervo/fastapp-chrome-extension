import client from '../../client'
import EducationInsert from '../../types/education/education-insert'

export default async function createUserEducation({ userId, ...props }: EducationInsert) {
    return client.post(`/users/${userId}/education`, {
        ...props,
    })
}
