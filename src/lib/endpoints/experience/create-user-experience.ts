import client from '../../client'
import ExperienceInsert from '../../types/experience/experience-insert'

export default async function createUserExperience({ userId, ...props }: ExperienceInsert) {
    return client.post(`/users/${userId}/experience`, {
        ...props,
    })
}
