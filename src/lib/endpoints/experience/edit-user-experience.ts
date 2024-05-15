import client from '../../client'
import ExperienceUpdate from '../../types/experience/experience-update'

export default async function editUserExperience({ userId, id, ...props }: ExperienceUpdate) {
    return client.patch(`/users/${userId}/experience/${id}/`, {
        ...props,
    })
}
