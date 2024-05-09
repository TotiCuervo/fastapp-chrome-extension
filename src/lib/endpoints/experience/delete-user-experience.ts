import client from '../../client'
import ExperienceDelete from '../../types/experience/experience-delete'

export default async function deleteUserExperience({ userId, id }: ExperienceDelete) {
    return client.delete(`/users/${userId}/experience/${id}`)
}
