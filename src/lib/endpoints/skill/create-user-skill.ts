import client from '../../client'
import SkillInsert from '../../types/skills/skill-insert'

export default async function createUserSkill({ userId, ...props }: SkillInsert) {
    return client.post(`/users/${userId}/skills`, {
        ...props,
    })
}
