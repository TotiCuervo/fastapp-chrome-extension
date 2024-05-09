import client from '../../client'
import SkillInsert from '../../types/skills/skill-insert'

export default async function updateUserSkill({ userId, ...props }: SkillInsert) {
    return client.patch(`/users/${userId}/skills`, {
        ...props,
    })
}
