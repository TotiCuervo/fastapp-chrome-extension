import client from '../../client'
import EducationDelete from '../../types/education/education-delete'

export default async function deleteUserEducation({ userId, id }: EducationDelete) {
    return client.delete(`/users/${userId}/education/${id}`)
}
